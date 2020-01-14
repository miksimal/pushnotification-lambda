# pushnotification-lambda
Code for Lambda that sends push notification to iOS


# sample test event to try the lambda
<code><pre>
{
  "alert": "Greetings e a r t h l i n g ! 👽",
  "payload": "{id: 123}",
  "deviceToken": "CHANGEME" // get devicetoken from xcode
}
</code></pre>

# A tricky aspect of working with APNs is auth. Two methods:

+ The first method, which is the most painful error-prone is a **p12 certificate**. A painful process involving (a) filling out a “Certificate Signing Request” in your keychain, (b) uploading it to Apple Developer Center, (c) downloading a signed certificate “p12 certificate”, etc. etc. This .p12 would only work for this specific app, and only for EITHER prod or dev.

+ The second, newer, method using a **p8 certificate** is much simpler. This is outlined below. This will work for all your apps and for both dev and prod. Faster and much less error-prone. (Note: p8 certificate *cannot* - yet - be used with Amazon SNS.. Works fine for Pinpoint and Lambdas, however).

# To create a new .p8

+ First, go to the *Keys → All* page in the Developer Center and click the `+` button to create a new Auth Key.
+ Then, pick a name, make sure the APNs is ticked, and click confirm.
+ Download the key and note down the Key ID.



