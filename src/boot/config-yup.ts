import yup, { LocaleObject, Message } from 'yup';
import { date } from 'yup';
import { josa } from 'josa';
import moment from 'moment-timezone';

export default function config() {
  // const moment = require('moment')
  moment.tz.setDefault('Asia/Seoul');

  const yup_locale: LocaleObject = {
    mixed: {
      default: '사용할 수 없는 값입니다.',
      // required: '필수입력입니다.',
      required: (ref) => msg(ref, '필수입력입니다.'),
      // oneOf: '다음 값 중 하나여야 합니다. : ${values}',
      oneOf: (ref) => msg(ref, `다음 값 중 하나여야 합니다. - ${ref.values}`),
      notOneOf: (ref) =>
        msg(ref, `다음 값 중 하나가 아니어야 합니다. - ${ref.values}`),
      notType: function notType(ref) {
        // const path = ref.path;
        const type = ref.type;
        // const value = ref.value;
        // const originalValue = ref.originalValue;
        // var isCast = originalValue != null && originalValue !== value;

        if (type == 'number') {
          return '숫자만 입력하세요.';
        } else if (type == 'date') {
          return msg(ref, '날짜 형식으로 입력하세요.');
        } else {
          return (
            getItemName(ref) + ' 항목은 `' + type + '` 형식으로 입력하세요.'
          );
        }
      },
      defined: '정의되지 않았습니다.',
    },
    string: {
      length: (ref) => msg(ref, `${ref.length}자로 입력하세요.`),
      min: (ref) => msg(ref, `${ref.min}자 이상 입력하세요.`),
      max: (ref) => msg(ref, `${ref.max}자 까지 입력됩니다.`),
      email: (ref) => msg(ref, '이메일 형식으로 입력하세요.'),
    },
    number: {
      min: (ref) => msg(ref, `${ref.min}#{unit} 이상으로 입력하세요.`),
      max: (ref) => msg(ref, `${ref.max}#{unit} 이하로 입력하세요.`),
      lessThan: (ref) => msg(ref, `${ref.less}#{unit} 보다 작게 입력하세요.`),
      moreThan: (ref) => msg(ref, `${ref.more}#{unit} 보다 크게 입력하세요.`),
      positive: (ref) => msg(ref, '양수값으로 입력하세요.'),
      negative: (ref) => msg(ref, '음수값으로 입력하세요.'),
      integer: (ref) => msg(ref, '정수로 입력하세요.'),
    },
    date: {
      min: (ref) => msg(ref, `${ref.min} 이후로 입력하세요.`),
      max: (ref) => msg(ref, `${ref.max} 이전으로 입력하세요.`),
    },
  };

  function msg(ref: any, template: string) {
    // return getItemName(ref:any) + ' 항목은 ' + template;
    // return josa(`${getItemName(ref:any)} ' 항목은 ${template}`)
    let msgTemplate = template;
    const unit = ref.spec.unit ?? '';
    msgTemplate = msgTemplate.replaceAll('#{unit}', unit);

    return josa(`${getItemName(ref)}#{은} ${msgTemplate}`);
  }

  function getItemName(ref: any): string {
    return ref.label ?? ref.path;
  }

  yup.setLocale(yup_locale);

  // number에 단위 이름(unit) 추가
  // yup.addMethod(number, 'unit', function (unit: string) {
  //   this.spec.unit = unit;
  //   return this;
  // });

  function formatDate(date: any) {
    const mdate = moment(date);
    return mdate.format('HHmmss') === '000000'
      ? mdate.format('YYYY-MM-DD')
      : mdate.format('YYYY-MM-DD HH:mm:ss');
  }

  yup.addMethod(date, 'sameOrAfter', function (compareField, message) {
    return this.test('same of after date', (value, context) => {
      const name = context.schema.spec.label ?? context.path;
      const { createError } = context;
      if (!value) {
        return createError({
          message: message ?? josa('정의되지 않았습니다.'),
        });
      }

      const compareValue = context.parent[compareField];
      // const compareDate = moment(compareValue);
      const compareFieldName =
        (context.from?.[0].schema as any).fields[compareField].spec.label ??
        compareField;
      // const dateFmt =
      //   compareDate.format('HHmmss') === '000000'
      //     ? compareDate.format('YYYY-MM-DD')
      //     : compareDate.format('YYYY-MM-DD HH:mm:ss');
      // name (label or path)
      return (
        value >= compareValue ||
        createError({
          message:
            // message ?? `${name} 항목은 ${dateFmt} 보다 크거나 같아야합니다.`,
            message ??
            josa(`${name}#{은} ${compareFieldName}보다 크거나 같아야합니다.`),
        })
      );
    });
  });

  yup.addMethod(date, 'after', function (compareField, message) {
    let resultMessage = message;
    return this.test('after date', (value, context) => {
      const name = context.schema.spec.label ?? context.path;
      const { createError } = context;
      if (!value) {
        return createError({
          message: message ?? josa('정의되지 않았습니다.'),
        });
      }
      const compareValue = context.parent[compareField];
      const compareFieldName =
        (context.from?.[0].schema as any).fields[compareField].spec.label ??
        compareField;
      const cmpDate = formatDate(compareValue);
      const curDate = formatDate(value);
      if (resultMessage) {
        resultMessage = resultMessage.replaceAll('${name}', name);
        resultMessage = resultMessage.replaceAll('${value}', curDate);
        resultMessage = resultMessage.replaceAll(
          '${compareFieldName}',
          compareFieldName
        );
        resultMessage = resultMessage.replaceAll('${compareValue}', cmpDate);
        resultMessage = josa(resultMessage);
      }
      return (
        value > compareValue ||
        createError({
          message:
            message ??
            josa(`${name}#{은} ${compareFieldName}보다 커야 합니다.`),
        })
      );
    });
  });
}
