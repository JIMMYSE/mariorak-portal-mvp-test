import { boot } from 'quasar/wrappers';
import { App, defineAsyncComponent, DefineComponent } from 'vue';

export default boot(async ({ app }) => {
  await registerComponentsInFolder(
    await import.meta.glob('../components/form/**/*.vue'),
    'components/form',
    app
  );
  await registerComponentsInFolder(
    await import.meta.glob('../components/common/**/*.vue'),
    'components/common',
    app
  );
});

// Define interface for components
async function registerComponentsInFolder(
  context: Record<string, () => Promise<{ [key: string]: any }>>,
  explicitPath: string,
  app: App<any>
) {
  try {
    for (const path in context) {
      if (Object.prototype.hasOwnProperty.call(context, path)) {
        const componentModule = (await context[path]())
          .default as DefineComponent; // Ensure correct type

        const folderName = path.split('/').slice(-2, -1)[0]; // Extract parent folder name

        const targetPath = path.endsWith('/index.vue') ? folderName : path;

        const componentNameAsPascalCase = targetPath
          .replace(explicitPath, '')
          .replace(/^\..*\/.*\//, '') // Remove the folder path
          .replace(/\.vue$/, '')
          .replace(/\//g, '-') // Replace slashes with hyphens for component names
          .split('-')
          .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
          .join('');

        // console.log('register ', componentNameAsPascalCase);
        app.component(
          componentNameAsPascalCase,
          defineAsyncComponent(async () => componentModule)
        );

        const componentNameAsKababCase = targetPath
          .replace(explicitPath, '')
          .replace(/^\..*\/.*\//, '') // Remove the folder path
          .replace(/\.vue$/, '')
          .replace(/^([A-Z])([A-Z])/, '$1-$2')
          .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
          .toLowerCase();

        // console.log('register ', componentNameAsKababCase);
        app.component(
          componentNameAsKababCase,
          defineAsyncComponent(async () => componentModule)
        );
      }
    }
  } catch (err) {
    console.warn('registerComponentsInFolder error:', err);
  }
}
