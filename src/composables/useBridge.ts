import { useQuasar } from 'quasar';
import { ComputedRef, computed, ref } from 'vue';
import { networkError } from 'src/services/error-handler';
import { getAccessToken } from 'src/composables/domain/auth';
import { useQueryClient } from '@tanstack/vue-query';
import { LoginReqType } from 'src/types/auth/auth-model';

declare const window: {
  refetchData: () => void;
  getDeviceInfoCB: (data: any) => void;
  onDeviceEvent: (data: any) => void;
  JSOUT: any;
  webkit: {
    messageHandlers: {
      iOSBridge: {
        postMessage: (message: any) => void;
      };
    };
  };
} & Window;

const JSOUT = window.JSOUT || {};
const webkit = window.webkit || {
  messageHandlers: {
    iOSBridge: {},
  },
};

export type DeviceEventType =
  | 'back_button_pressed'
  | 'resumed'
  | 'paused'
  | 'login_social';
export type DeviceEvent = { type: DeviceEventType; detail: any };

export type DeviceInfo = LoginReqType['agent'];
// 현재 호출한 디바이스가 어떤 것인지 체크합니다.
export const agentInfo = ref<DeviceInfo | undefined>();
export const accessModalVisible = ref(false);
export const isBackground = ref(false);

export type DeviceType = 'iOS' | 'aOS' | 'PC';

/** @type { Object.<string, Array<function(DeviceEvent):void>> }*/
const eventListeners: Record<string, Array<(event: DeviceEvent) => void>> = {};

export const useBridge = () => {
  const $q = useQuasar();
  const os = computed(() =>
    $q.platform.is.ios ? 'ios' : $q.platform.is.android ? 'android' : 'web'
  );
  const deviceType: ComputedRef<DeviceType> = computed(
    () =>
      $q.platform.is.desktop || $q.platform.is.mac
        ? 'PC'
        : $q.platform.is.iphone || $q.platform.is.ipad
        ? 'iOS'
        : 'aOS'
    // /iPhone/i.test(navigator.userAgent)
    //   ? 'iOS'
    //   : /Android/i.test(navigator.userAgent)
    //   ? 'aOS'
    //   : 'PC'
  );

  function error(...args: any[]) {
    console.error(`Bridge:: [${os.value}]`, ...args);
  }

  function log(...args: any[]) {
    console.log(`Bridge:: [${os.value}]`, ...args);
  }

  function getDeviceInfoCB(payload: string) {
    log('getDeviceInfo: success', payload);
    try {
      agentInfo.value = JSON.parse(payload);
    } catch (error) {
      log('ERR: getDeviceInfoCB', error);
    }
  }

  function onDeviceEvent(payload: string) {
    try {
      const ev = JSON.parse(payload) as DeviceEvent;
      log('onDeviceEvent:: ', ev);
      if (ev.type in eventListeners) {
        eventListeners[ev.type].forEach((cb) => cb(ev));
        // back button 눌렀을 때 true 값을 반환하면
        // 안드로이드에서 history.back() 을 호출하지 않는다.
        if (ev.type === 'back_button_pressed') {
          return eventListeners[ev.type].length > 0;
        }
      }
    } catch (error) {
      log('ERR: onDeviceEvent', error);
    }
    return false;
  }

  async function checkRoomAvailableToEnter(id: number) {
    // const { status, error, data } = await getRoom(id);
    // if (error) {
    //   console.log('ERR:: checkRoomAvailableToEnter', { status, error });
    //   return false;
    // }
    // console.log('SUCCESS:: checkRoomAvailableToEnter', { status, data });
    // return data.boxes.status === '50';
    return true;
  }

  const queryClient = useQueryClient();
  const queryKeys = [
    ['notice'],
    ['bookstore'],
    ['library'],
    ['notification'],
    ['banner'],
  ];

  //controll accessbilityModal
  // function showAccessibilityModal() {
  //   accessModalVisible.value = true;
  // }
  //
  // if (!window.showAccessibilityModal) {
  //   window.showAccessibilityModal = showAccessibilityModal;
  //   log('showAccessibilityModal registered');
  // }

  function refetchData() {
    log('refetchData');
    isBackground.value = false;

    queryKeys.forEach((queryKey) => {
      log('invalidateQueries', queryKey);
      queryClient.invalidateQueries({ queryKey });
    });
  }

  if (!window.refetchData) {
    window.refetchData = refetchData;
    log('refetchData registered');
  }
  if (!window.getDeviceInfoCB) {
    window.getDeviceInfoCB = getDeviceInfoCB;
    log('getDeviceInfoCB registered');
  }

  if (!window.onDeviceEvent) {
    window.onDeviceEvent = onDeviceEvent;
    log('onDeviceEvent registered');
  }

  // const { latestVersion } = useAppVersion();

  /**
   * @param  type;
   * @param  listener*/
  function addEventListener(
    type: DeviceEventType,
    listener: (event: DeviceEvent) => void
  ) {
    eventListeners[type] = [...(eventListeners[type] ?? []), listener];
    // return handler to remove event listener
    return () =>
      (eventListeners[type] = eventListeners[type].filter(
        (cb) => cb !== listener
      ));
  }

  /**  @param  type;*/
  function removeAllEventListeners(type: DeviceEventType) {
    eventListeners[type] = [];
  }

  // if (!agentInfo.value) functionMap[os.value].getAgentInfo();
  let api = {
    agentInfo,
    webBridgeReady() {
      log('webBridgeReady');
    },
    getAgentInfo() {
      log('getAgentInfo');
    },
    notifyLoginFin() {
      log('notifyLoginFin');
    },
    notifyLogoutFin() {
      log('notifyLogoutFin');
    },
    makeWebToast(message: string) {
      log('makeWebToast', message);
    },
    toggleBackGestureActivation(isActivated: boolean) {
      log('toggleBackGestureActivation', isActivated);
    },
    async enterRoom(room_id: number, spwan_id: number = 1, short_url?: string) {
      if (networkError.value) return;

      if (short_url) {
        window.open(short_url, 'self');
        return;
      }
    },
    shareURL(url: string) {
      log('shareURL', url);
    },
    closeApp() {
      log('closeApp');
    },
    addEventListener,
    removeAllEventListeners,
  };

  if (os.value === 'android')
    api = {
      agentInfo,
      /**
       *  브릿지 사용 가능 전달
       */
      webBridgeReady() {
        log('webBridgeReady');

        try {
          JSOUT.webBridgeReady();
        } catch (e) {
          error(e);
        }
      },
      getAgentInfo() {
        try {
          const info = JSOUT.getDeviceInfo();
          log('getDeviceInfo: success', info);
          agentInfo.value = JSON.parse(info);
        } catch (e) {
          log('ERR:: getDeviceInfo', e);
        }
      },
      /**
       *  웹뷰에서 로그인 완료된 후 호출하는 메소드
       */
      notifyLoginFin() {
        log('notifyLoginFin');
        try {
          JSOUT.notifyLoginFin();
        } catch (e) {
          error(e);
        }
      },
      /**
       *  웹뷰에서 로그아웃 완료된 후 호출하는 메소드
       */
      notifyLogoutFin() {
        log('notifyLogoutFin');
        try {
          JSOUT.notifyLogoutFin();
        } catch (e) {
          error(e);
        }
      },
      /**
       * 웹뷰에서 토스트메시지 띄울 때 호출하는 메소드
       * @param  message - 토스트메시지에 띄울 메시지 내용
       */
      makeWebToast(message: string) {
        log('makeWebToast', message);
        try {
          JSOUT.makeWebToast(message);
        } catch (e) {
          error(e);
        }
      },
      toggleBackGestureActivation(isActivated) {
        log('toggleBackGestureActivation', isActivated);
        try {
          JSOUT.toggleBackGestureActivation(isActivated);
        } catch (e) {
          error(e);
        }
      },

      /**
       * 메타버스 룸 입장할 때 호출하는 메소드
       * @param {String} room_id - 룸 입장을 위해 유니티에 전달할 박스 id
       */
      async enterRoom(
        room_id: number,
        spwan_id: number = 1,
        short_url?: string
      ) {
        if (networkError.value) return;
        log('enterRoom', room_id);
        // if (short_url) {
        //   window.open(short_url, 'self');
        //   return;
        // }
        const available = await checkRoomAvailableToEnter(room_id);

        if (!available) {
          alert('유효한 룸이 아닙니다.');
          return;
        }

        const token = getAccessToken() ?? 'guest';
        const payload = token + '|~|' + room_id + '|~|' + spwan_id;

        try {
          JSOUT.enterRoom(payload);
          isBackground.value = true;
        } catch (e) {
          error(e);
        }
      },
      /**
       * 디바이스 공유하기 호출
       */
      shareURL(url: string) {
        log('shareURL', url);

        try {
          JSOUT.shareURL(url);
        } catch (e) {
          error(e);
        }
      },

      /**
       * 앱을 종료하는 함수
       */
      closeApp() {
        log('closeApp');
        try {
          JSOUT.closeApp();
        } catch (e) {
          error(e);
        }
      },
      addEventListener,
      removeAllEventListeners,
    };
  else if (os.value === 'ios')
    api = {
      agentInfo,
      getAgentInfo() {
        log('getAgentInfo');
        const payload = {
          action: 'getDeviceInfo',
        };

        try {
          webkit.messageHandlers.iOSBridge.postMessage(payload);
        } catch (e) {
          error(e);
        }
      },
      /**
       *  브릿지 사용가능 전달
       */
      webBridgeReady() {
        log('webBridgeReady');

        const payload = {
          action: 'webBridgeReady',
        };

        try {
          webkit.messageHandlers.iOSBridge.postMessage(payload);
        } catch (e) {
          error(e);
        }
      },
      /**
       *  웹뷰에서 로그인 완료된 후 호출하는 메소드
       */
      notifyLoginFin() {
        log('notifyLoginFin');
        const payload = {
          action: 'notifyLoginFin',
        };

        try {
          webkit.messageHandlers.iOSBridge.postMessage(payload);
        } catch (e) {
          error(e);
        }
      },
      /**
       *  웹뷰에서 로그아웃 완료된 후 호출하는 메소드
       */
      notifyLogoutFin() {
        log('notifyLogoutFin');
        const payload = {
          action: 'notifyLogoutFin',
        };

        try {
          webkit.messageHandlers.iOSBridge.postMessage(payload);
        } catch (e) {
          error(e);
        }
      },
      /**
       * 웹뷰에서 토스트메시지 띄울 때 호출하는 메소드
       * @param {String} str - 토스트메시지에 띄울 메시지 내용
       */
      makeWebToast(message: string) {
        log('makeWebToast', message);
        const payload = {
          action: 'makeWebToast',
          str: message,
        };

        try {
          webkit.messageHandlers.iOSBridge.postMessage(payload);
        } catch (e) {
          error(e);
        }
      },

      toggleBackGestureActivation(isActivated) {
        log('toggleBackGestureActivation', isActivated);
        const payload = {
          action: 'toggleBackGestureActivation',
          isActivated,
        };

        try {
          webkit.messageHandlers.iOSBridge.postMessage(payload);
        } catch (e) {
          error(e);
        }
      },
      /**
       * 메타버스 룸 입장할 때 호출하는 메소드
       * @param {String} room_id - 룸 입장을 위해 유니티에 전달할 박스 id
       */
      async enterRoom(
        room_id: number,
        spwan_id: number = 1,
        short_url?: string
      ) {
        if (networkError.value) return;
        // if (short_url) {
        //   window.open(short_url, 'self');
        //   return;
        // }
        const available = await checkRoomAvailableToEnter(room_id);

        if (!available) {
          alert('유효한 룸이 아닙니다.');
          return;
        }
        const token = getAccessToken() ?? 'guest';
        const payload = {
          action: 'enterRoom',
          paramMsg: token + '|~|' + room_id + '|~|' + spwan_id,
        };
        log('enterRoom', payload);

        try {
          webkit.messageHandlers.iOSBridge.postMessage(payload);
          isBackground.value = true;
        } catch (e) {
          error(e);
        }
      },
      /**
       * 디바이스 공유하기 호출
       */
      shareURL(url: string) {
        const payload = {
          action: 'shareURL',
          url,
        };
        log('shareURL', payload);

        try {
          webkit.messageHandlers.iOSBridge.postMessage(payload);
        } catch (e) {
          error(e);
        }
      },
      /**
       * 앱을 종료하는 함수
       */
      closeApp() {
        log('closeApp');
        const payload = {
          action: 'closeApp',
        };

        try {
          webkit.messageHandlers.iOSBridge.postMessage(payload);
        } catch (e) {
          error(e);
        }
      },
      addEventListener,
      removeAllEventListeners,
    };

  api.getAgentInfo();

  if (
    !!window.refetchData &&
    !!window.getDeviceInfoCB &&
    !!window.onDeviceEvent
  ) {
    log('webBridgeReady');
    try {
      api.webBridgeReady();
    } catch (error: any) {
      error(error);
    }
  }

  return { ...api, os, deviceType };
};
