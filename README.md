# Alegrify app (React Native)

<a href="https://itunes.apple.com/app/alegrify/id1450090646" title="app store">
  <img alt="app store" src="https://alegrify.com/apple_store.png" width="160" />
</a>
<a href="https://play.google.com/store/apps/details?id=com.alegrify" title="play store">
  <img alt="play store" src="https://alegrify.com/google-play.png" width="160" />
</a>

Alegrify was a web service to improve your mental health by challenging your own thoughts.
While the service is offline, the app can still be used, allthough all of the features that required networking have been removed.

## Architecture

The app has been built upon a basic react-redux architecture.

### Actions

[Take a look at all actions](https://github.com/dejakob/react-native-alegrify-offline/tree/master/src/store-actions)

### Reducers

There's obviously only one reducer but this combines several subreducers.
[Take a look at all reducers](https://github.com/dejakob/react-native-alegrify-offline/tree/master/src/store-reducers)

### Effects

As Redux actions are always syncronous, some 'effects' have been added to guarantee support for asyncronous actions.
[Take a look at all effects](https://github.com/dejakob/react-native-alegrify-offline/tree/master/src/store-fx)

## Automated tests

To be able to run the automated tests, be sure you're using OS X as all tests use XCode.
Before running the tests on your machine, make sure detox and the following packages are installed:

```bash
brew tap wix/brew
brew install --HEAD applesimutils
npm install -g detox-cli
npm install -g react-native-cli
```

## User Interface

The User Interface has been built with components from the [react-native-alegrify-ui](https://www.npmjs.com/package/react-native-alegrify-ui) package. Take a look [here](https://dejakob.com/react-native-alegrify-ui) to read the docs.

## Used sources

The images in the app have been licensed by the author as 'free to use'.
Check out the links to have the images in their original formats.

* https://www.pexels.com/photo/person-on-a-bridge-near-a-lake-747964/
* https://www.pexels.com/photo/person-leans-on-arms-with-sad-text-1927571/
* https://www.pexels.com/photo/blonde-hair-blur-daylight-environment-214574/
* https://www.pexels.com/photo/light-sky-space-abstract-40748/
* https://www.pexels.com/photo/man-couple-people-woman-343/
