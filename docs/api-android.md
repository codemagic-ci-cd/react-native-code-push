### Resource Configuration

Since `autolinking` uses `react-native.config.js` to link plugins, constructors are specified in that file. But you can override custom variables to manage the CodePush plugin by placing these values in string resources.

- **Public Key** - used for bundle verification in the Code Signing Feature. Please refer to [Code Signing](setup-android.md#code-signing-setup) section for more details about the Code Signing Feature.
  To set the public key, you should add the content of the public key to `strings.xml` with name `CodePushPublicKey`. CodePush automatically gets this property and enables the Code Signing feature. For example:

  ```xml
  <string moduleConfig="true" name="CodePushPublicKey">your-public-key</string>
  ```

- **Server Url** - used for specifying CodePush Server Url.
  The default server URL is configurable and can be overridden by adding your path to `strings.xml` with name `CodePushServerUrl`. CodePush automatically gets this property and will use this path to send requests. For example:
  ```xml
  <string moduleConfig="true" name="CodePushServerUrl">https://yourcodepush.server.com</string>
  ```

The Java API is made available by importing the `com.microsoft.codepush.react.CodePush` class into your `MainActivity.java` file, and consists of a single public class named `CodePush`.

### Java API Reference (Android)

#### CodePush

Constructs the CodePush client runtime and represents the `ReactPackage` instance that you add to you app's list of packages.

##### Constructors

- **CodePush(String deploymentKey, Activity mainActivity)** - Creates a new instance of the CodePush runtime, that will be used to query the service for updates via the provided deployment key. The `mainActivity` parameter should always be set to `this` when configuring your React packages list inside the `MainActivity` class. This constructor puts the CodePush runtime into "release mode", so if you want to enable debugging behavior, use the following constructor instead.

- **CodePush(String deploymentKey, Activity mainActivity, bool isDebugMode)** - Equivalent to the previous constructor but allows you to specify whether you want the CodePush runtime to be in debug mode or not. When using this constructor, the `isDebugMode` parameter should always be set to `BuildConfig.DEBUG` in order to stay synchronized with your build type. When putting CodePush into debug mode, the following behaviors are enabled:

  1. Old CodePush updates aren't deleted from storage whenever a new binary is deployed to the emulator/device. This behavior enables you to deploy new binaries, without bumping the version during development, and without continuously getting the same update every time your app calls `sync`.

  2. The local cache that the React Native runtime maintains in debug mode is deleted whenever a CodePush update is installed. This ensures that when the app is restarted after an update is applied, you will see the expected changes. As soon as [this PR](https://github.com/facebook/react-native/pull/4738) is merged, we won't need to do this anymore.

- **CodePush(String deploymentKey, Context context, boolean isDebugMode, Integer publicKeyResourceDescriptor)** - Equivalent to the previous constructor, but allows you to specify the public key resource descriptor needed to read public key content. Please refer to [Code Signing](setup-android.md#code-signing-setup) section for more details about the Code Signing Feature.

- **CodePush(String deploymentKey, Context context, boolean isDebugMode, String serverUrl)** Constructor allows you to specify CodePush Server Url. The default server URL is configurable and is overridden by value specified in `serverUrl`.

##### Public Methods

- **setDeploymentKey(String deploymentKey)** - Sets the deployment key that the app should use when querying for updates. This is a dynamic alternative to setting the deployment key in Codepush constructor/builder and/or specifying a deployment key in JS when calling `checkForUpdate` or `sync`.

##### Static Methods

- **getBundleUrl()** - Returns the path to the most recent version of your app's JS bundle file, assuming that the resource name is `index.android.bundle`. If your app is using a different bundle name, then use the overloaded version of this method which allows specifying it. This method has the same resolution behavior as the Objective-C equivalent described above.

- **getBundleUrl(String bundleName)** - Returns the path to the most recent version of your app's JS bundle file, using the specified resource name (like `index.android.bundle`). This method has the same resolution behavior as the Objective-C equivalent described above.

- **getPackageFolder()** - Returns the path to the current update folder.

- **overrideAppVersion(String appVersionOverride)** - Sets the version of the application's binary interface, which would otherwise default to the Play Store version specified as the `versionName` in the `build.gradle`. This should be called a single time, before the CodePush instance is constructed.
