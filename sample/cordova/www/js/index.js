/*
 *  index.js
 *
 * This file is a part of the AppMetrica.
 *
 * Version for Cordova/PhoneGap © 2017 YANDEX
 *
 * You may not use this file except in compliance with the License.
 * You may obtain a copy of the License at https://yandex.com/legal/metrica_termsofuse/
 */

"use strict";

var app = {
    configuration: {
        apiKey: '5012c3cc-20a4-4dac-92d1-83ebc27c0fa9'
    },
    initialize: function () {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },
    onDeviceReady: function () {
        window.appMetrica.activate(this.configuration);

        forEach(document.getElementsByTagName('button'), function (button) {
            // Workaround for buttons click animation.
            button.addEventListener("touchstart", function () { return true; });
            button.addEventListener("click", actions[button.id]);
        });
        forEach(document.getElementsByTagName('input'), function (checkbox) {
            if (checkbox.getAttribute('type') == 'checkbox') {
                checkbox.addEventListener("click", actions[checkbox.id]);
            }
        });
    }
};

var actions = {
    reportEventBtn: function () {
        window.appMetrica.reportEvent('Test event');
    },
    reportEventWithParametersBtn: function () {
        window.appMetrica.reportEvent('Test event', { 'foo': 'bar' });
    },
    reportErrorBtn: function () {
        window.appMetrica.reportError('Test error', 'Error reason');
    },
    setMinskBtn: function () {
        window.appMetrica.setLocation({
            latitude: 53.890651,
            longitude: 27.525408,
            altitude: 224,
            accuracy: 30,
            verticalAccuracy: 10,
            course: 23,
            speed: 2,
            timestamp: 1490352300
        });
    },
    setMoscowBtn: function () {
        window.appMetrica.setLocation({
            latitude: 55.734417,
            longitude: 37.588029,
            altitude: 157,
            accuracy: 45,
            verticalAccuracy: 25,
            course: 42,
            speed: 1,
            timestamp: 1490352342
        });
    },
    setAppVersionBtn: function () {
        window.appMetrica.setCustomAppVersion(document.getElementById('appVersionInput').value);
    },
    setSessionTimeoutBtn: function () {
        window.appMetrica.setSessionTimeout(parseInt(document.getElementById('sessionTimeoutInput').value));
    },
    setLoggingEnabledBtn: function () {
        window.appMetrica.setLoggingEnabled();
    },
    trackLocationInput: function () {
        window.appMetrica.setTrackLocationEnabled(document.getElementById('trackLocationInput').checked);
    },
    collectInstalledAppsInput: function () {
        window.appMetrica.setCollectInstalledAppsEnabled(document.getElementById('collectInstalledAppsInput').checked);
    },
    reportCrashesInput: function () {
        window.appMetrica.setReportCrashesEnabled(document.getElementById('reportCrashesInput').checked);
    },
    requestLocation: function () {
        var onSuccess = function(position) {
            alert(
                'Latitude: '          + position.coords.latitude          + '\n' +
                'Longitude: '         + position.coords.longitude         + '\n' +
                'Altitude: '          + position.coords.altitude          + '\n' +
                'Accuracy: '          + position.coords.accuracy          + '\n' +
                'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
                'Heading: '           + position.coords.heading           + '\n' +
                'Speed: '             + position.coords.speed             + '\n' +
                'Timestamp: '         + position.timestamp                + '\n'
            );
        };
        function onError(error) {
            alert(
                'code: '    + error.code    + '\n' +
                'message: ' + error.message + '\n'
            );
        }
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }
}

function forEach (arr, foo) {
    // Workaround for old browsers.
    for (var index = 0, len = arr.length; index < len; ++index) {
        var element = arr[index];
        foo(element);
    }
}

app.initialize();