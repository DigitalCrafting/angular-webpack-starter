# angular-webpack-starter
Starter for frontend app with Webpack 5, Angular 12, Karma, Jasmine

This configuration supports multiple projects which may have common parts, for example custom styles or controls. Each project will have it's own webpack configuration files and starting command.

- `npm run start-*` is like ng serve -> it starts project in development mode with hot reload

- `npm run build-*` builds project for higher development environments, and outputs them into dist. From there they need to be simply copied into, for example spring app target folder

- `npm run test` runs unit tests in *.spec.ts files

The example applications are also dockerized for production, to run them
1. Build both apps using `npm run build-*`
2. Run `docker-compose up`

This project needs some polishing, but otherwise it is complete starter for small and big projects alike  
