### React Native App that fetches both upcoming and previous draws from thelott.com

This App has only been tested on Android, as I do not own a Mac or an iPhone.
I don't see any reason why it wouldn't work on iOS, as I don't believe im using any platform specific code.

## Running
Once React Native is set up:
from the command line in the main directory:
Start an Android emulator from Android Studio, or connect an Android phone via usb
run 'yarn' to install packages
run 'yarn start' to start metro
from another command line window or tab, run 'yarn react-native run-android'

## Setup React Native
https://reactnative.dev/docs/environment-setup

# On Windows, for Android:

Install Node
(This can be done via Chocolatey 'choco install nodejs.install', or from https://nodejs.org/en/download/)

Install Yarn
(This can also be done via Chocolatey 'choco install yarn', or from https://classic.yarnpkg.com/en/docs/install/#windows-stable)

Install the JDK
(Once again, can be done via Chocolatey 'choco install openjdk8')

Install Android Studio from https://developer.android.com/studio

# Android Studio Setup

In the SDK Manager (Welcome Screen -> Configure -> SDK Manager)
- Tick 'Show Package' details, and install Android SDK Platform 29 and Google APIs Intel x86 Atom System Image

Add ANDROID_HOME to env variables
(Settings -> System -> About -> Advanced System Settings -> Environment Variables)
'New' User Variable, Name 'ANDROID_HOME', Value '%LOCALAPPDATA%\Android\Sdk', or wherever the Sdk has been installed.

Add platform-tools to path
Choose the 'Path' user environment variable, click edit, then add '%LOCALAPPDATA%\Android\Sdk\platform-tools'

Powershell need to be restarted for changes to apply.

