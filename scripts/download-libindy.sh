#!/bin/bash

LIBINDY_VERSION=1.15.0
ARCH=arm64-v8a
JNA_ARCH=aarch64

mkdir -p android/app/src/main/jniLibs/arm64-v8a

mkdir -p tmp
pushd tmp
  wget https://repo.sovrin.org/android/libindy/stable/${LIBINDY_VERSION}/libindy_android_arm64_${LIBINDY_VERSION}.zip
  unzip -a libindy_android_arm64_${LIBINDY_VERSION}.zip
  cp libindy_arm64/lib/libindy.so ../android/app/src/main/jniLibs/arm64-v8a

  wget https://github.com/java-native-access/jna/raw/5.5.0/lib/native/android-${JNA_ARCH}.jar
  jar xf android-${JNA_ARCH}.jar libjnidispatch.so
  cp libjnidispatch.so ../android/app/src/main/jniLibs/arm64-v8a
popd

rm -rf tmp
