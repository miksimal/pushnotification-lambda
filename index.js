// import apn node module (https://www.npmjs.com/package/apn)
var apn = require('apn');

// Set up apn with the APNs Auth Key
var apnProvider = new apn.Provider({

    token: {
       key: 'apns.p8', // path to the key p8 file
       keyId: 'CHANGEME', // key ID from the p8 file
       teamId: 'CHANGEME', // Team ID of Apple Developer Account
   },
   
   production: false // true if sending notification to a production app
   
});

// prepare new notification
var notification = new apn.Notification();

// Specify your iOS app's Bundle ID (accessible from xcode)
notification.topic = 'EXAMPLE.mikkelpushtest';

// Set expiration to 1 hour from now (in case device is offline)
notification.expiry = Math.floor(Date.now() / 1000) + 3600;

// Set app badge indicator. Here, we just set it to 1, but obviously should be incremented instead.
notification.badge = 1;

exports.handler = (event, context) => {

    var deviceToken = event.deviceToken;
    
    // notification message, get this from the event (argument to handler method) - in our case a test event.
    notification.alert = event.alert;
    
    // any extra payload data which will be accessible to the app in didReceiveRemoteNotification
    // for more on payload, see: https://developer.apple.com/library/archive/documentation/NetworkingInternet/Conceptual/RemoteNotificationsPG/CreatingtheNotificationPayload.html
    notification.payload = event.payload;
     
     // Actually send the notification!
    apnProvider.send(notification, deviceToken).then(function(result) {  
        
        // Check the result for any failed devices
        console.log(result);
        
        // Exit (through either succeed or callback), otherwise lambda will time out:
        context.succeed("done");

    });
};
