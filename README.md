# IpGeolocationApp

Hello, here I want to describe and explain a bit about used stack and some cases on what You can have questions.

## About project

I generated the application using `ng` command to have the lates version of Angular what is 18 right now, to show you that I already can work with all new features such a standalone components (without needed to have a modules at all), with new control flow such as `@if`, `@switch`, also I want to mention that in components I tried to don't use a constructor at all as right now we can use `inject()` function to add services where we need them. Of course I could use `Nx workspace` but I thought as it's not needed in such small project but want to mention that past years I'm alway working using NX to have a monorepo project.

## Used technologies

I used `Angular Material` lib to easy start with work as they have everything inside and we can easy define what module we need to use to don't load it all the time.

After some research I got that the best way to go with maps in Angular will be `ng-openlayers` lib as they have everything inside and this is good library with a lot of downloads and they are updating it all the time to align with Angular versions

For notifications I used `ngx-toastr` as it's a really good customizable lib to have the beauty notifications through the project.

And basically that's all what I want to mentions here as I think it's not needed to define each lib what is going out of the box with Angular.

## About components

### [Shared](./src/app/shared/index.ts)

I created a shared folder to add a best practices with reusable parts of code, interfaces, types, etc. With `NX` It could be not only a folder but the separate library what will be added as a dependency to the main application.

### [App component](./src/app/app.component.ts)

It's a standalone component that collects all child components what I will describe below. Also component have information about `current location` and `previous location`. I used a `ReplaySubject` to have a possibility to get the previous value of `Subject`.

### [Search box](./src/app/components/search-box/search-box.component.ts)

It's a standalone component what have in a template `material-form-control` used with `mat-error` inside. In component we have all services injected using `inject()`, reactive form, `@Output` added to communicate with parent component.

In such case I could not use a `FormGroup` but only `FormControl` and it will be enough, but I wanted to show you that I know how to create a reactive forms. I noticed that on sketch you had a **Search button**, but I added the `valueChanges` to check for changes in input with `debounceTime` and `Switch map` to cut previous streams. I supposed that it will be more modern way of working that can show you that I can work with streams and forms.  

Also here I added a few `REGEXes` to check for search control validation. The [REGEX](./src/app/shared/constants/constants.ts) pattern used for checking if user provided the correct URL such as https://test.com and correct IP address to prevent errors from back-end side and minimize API calls.

`getValueChangesStream()` function has a subscription for valueChanges to not duplicate code as I needed to have a different `filter` pipes implemented to prevent API call. For this I have a isolated arrow function `checkIsIp` to handle a few scenarious. One for URL value and another for IP value.
Also I had a problem because I must use 2 different APIs with different params and response. In such case I should separate the calls and in case when user provide URL (domain) I need to make an API call to get the IP of domain and only then make the API call to get details about this API where I used `concatMap` to wait for previous stream to be finished.

### [Map location](./src/app/components/map-location/map-location.component.ts)

Simple and almost dump standalone component what have a few `Input` parameters to be passed for showing the map based on lat & lng.

### [All searches](./src/app/components/all-searches/all-searches.component.ts)

Simple and dump standalone component what injecting service and getting stream with history of searched items.
In this case I could use a `localStorage` to save the data here and have possibility to get it through the project. But it's a very simple app and wanted to use RxJs streams to have it reactive and also I didn't find the needs of it as on each refresh the page the list will be empty what looks correct for me.

### [User location](./src/app/components/user-location/user-location.component.ts)
Simple and dump standalone component what pass only one parameter and render on UI information about IP address provided by user

#### Thanks for reading it to the end :)

## Development server

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.0.1.

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
