<img class="wp-image-310 size-large" src="https://blog.mehraban.com.au/wp-content/uploads/2018/02/1_rq0QRdr5CL1EqvC4WmmEhg-700x350.png" alt="" width="697" height="349" /> 

<a href="https://developers.google.com/web/progressive-web-apps/">Progressive Web Applications (PWA)</a> are getting more and more attractions by day. With recent move from DevKit team, adding service worker support to preview version of Safari, we can see the importance of the key role PWA's play in today's market.

With <a href="https://angular.io/">Angular version 5.0.0</a>, the team introduced a new version of their <a href="https://angular.io/guide/service-worker-intro">service worker aka (ngsw)</a> which has a ton of goodies from a fully functional service worker to full support for push notifications. In this post I will iterate through them and turn an existing application into a PWA.

The demo application I've prepared can be found on my GitHub repo here.

<!--more-->
<h2>Table of content</h2>
<ol>
 	<li><a href="#wispwa">What is a progressive web application?</a></li>
 	<li><a href="#support">Current state of support in major browsers</a></li>
 	<li><a href="#keycomponents">Key components</a></li>
 	<li><a href="#lighthouse">How to evaluate your current application?</a></li>
 	<li><a href="#appmanifest">Application manifest</a></li>
 	<li><a href="#angularpwa">Angular and PWA</a></li>
 	<li><a href="#ngsw">Angular Service Worker aka (ngsw)</a></li>
 	<li><a href="#hood">Under the hood</a></li>
 	<li><a href="#push">Push notifications</a></li>
</ol>
<h2><a id="wispwa"></a>What is a progressive web application?</h2>
In 2015, designer <strong>Frances Berriman</strong> and <a title="Google Chrome" href="https://en.wikipedia.org/wiki/Google_Chrome">Google Chrome</a> engineer <strong>Alex Russell</strong> coined the term <code>progressive web apps</code>.  These are applications which leverage new features supported by modern browsers such as <a href="https://developer.mozilla.org/en-US/docs/Web/Manifest">application manifest</a> and <a href="https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API">service worker</a> allowing us to create faster, more engaging and reliable applications.

They have the following characteristics:
<ul>
 	<li><b>Progressive</b> - Work for every user, regardless of browser choice because they’re built with <a title="Progressive enhancement" href="https://en.wikipedia.org/wiki/Progressive_enhancement">progressive enhancement</a> as a core tenet.</li>
 	<li><b>Responsive</b> - Fit any form factor: desktop, mobile, tablet, or forms yet to emerge.</li>
 	<li><b>Connectivity independent</b> - <a href="https://en.wikipedia.org/wiki/Progressive_web_app#Service_Workers">Service workers</a> allow work offline, or on low quality networks.</li>
 	<li><b>App-like</b> - Feel like an app to the user with app-style interactions and navigation.</li>
 	<li><b>Fresh</b> - Always up-to-date thanks to the service worker update process.</li>
 	<li><b>Safe</b> - Served via HTTPS to prevent snooping and ensure content hasn’t been tampered with.</li>
 	<li><b>Discoverable</b> - Are identifiable as “applications” thanks to W3C manifests<sup id="cite_ref-w3cmanifest_6-0" class="reference"><a href="https://en.wikipedia.org/wiki/Progressive_web_app#cite_note-w3cmanifest-6">[6]</a></sup> and service worker registration scope allowing search engines to find them.</li>
 	<li><b>Re-engageable</b> - Make re-engagement easy through features like <a title="Push technology" href="https://en.wikipedia.org/wiki/Push_technology">push notifications</a>.</li>
 	<li><b>Installable</b> - Allow users to “keep” apps they find most useful on their home screen without the hassle of an app store.</li>
 	<li><b>Linkable</b> - Easily shared via a URL and do not require complex installation.</li>
</ul>
These applications look very similar to a native mobile application and offer some features that makes user very happy. The most important one is ability to add the application to your device's home screen. Accessing device's hardware like location, camera and etc. is another thing where it gives a native experience to users.
<h2><a id="keycomponents"></a>Key components</h2>
There are three key components you will have to add to your project to be able to say your web application is progressive.
<h3>Application manifest</h3>
From <a href="https://developer.mozilla.org/en-US/docs/Web/Manifest">Mozilla documents</a>:
<blockquote>The web app manifest provides information about an application (such as name, author, icon, and description) in a <code>JSON</code> text file. The purpose of the manifest is to install web applications to the homescreen of a device, providing users with quicker access and a richer experience.</blockquote>
<h3>Service worker</h3>
A service worker is a script that your browser runs in the background, separate from a web page, opening the door to features that don't need a web page or user interaction. It includes offline support, request caching, <a href="https://developers.google.com/web/updates/2015/03/push-notifications-on-the-open-web">push notifications</a> and <a href="https://developers.google.com/web/updates/2015/12/background-sync">background sync</a>.
<h3>App shell</h3>
An <strong>application shell</strong> (or app shell) architecture is one way to build a Progressive Web App that reliably and instantly loads on your users' screens, similar to what you see in native applications.
<h2><a id="support"></a>Current state of support in major browsers</h2>
Most of the major browsers have been trying to add support for application manifest and service workers. By the start of the last year <a href="https://www.google.ca/chrome/browser/desktop/index.html">Chrome</a> and <a href="https://play.google.com/store/apps/details?id=com.android.chrome&amp;hl=en">Chrome mobile</a> had full support, whereas <a href="https://www.apple.com/au/safari/">Safari</a> wasn't even looking into it. <a href="https://www.microsoft.com/en-au/windows/microsoft-edge">Microsoft Edge</a> not only were working on it, but also looking into adding PWA's to their store with the help of <a href="https://electronjs.org">ElectronJS</a>. Mozilla's <a href="https://www.mozilla.org/en-US/firefox/new">FireFox</a> team was supporting most of the features as well but they were a bit behind <a href="https://www.google.com">Google</a> on that.

<img class="alignnone size-large wp-image-316" src="https://blog.mehraban.com.au/wp-content/uploads/2018/02/1_46hK7o1uQBp9IFu94lnOcg-700x92.png" alt="" width="697" height="92" />

Later in the year there was a massive effort put into supporting the new API's and surprisingly Apple started working on it seriously. Microsoft Edge got it in preview and Safari added some basic support as well.

<img class="alignnone size-large wp-image-317" src="https://blog.mehraban.com.au/wp-content/uploads/2018/02/1_1-QWS0voA9O4_y6-b-wocw-700x87.png" alt="" width="697" height="87" />

&nbsp;
<p style="text-align: center;"><span style="font-size: 8pt;">Photo from : <a href="https://ispwaready.toxicjohann.com/" target="_blank" rel="noopener" data-cke-saved-href="https://ispwaready.toxicjohann.com/">https://ispwaready.toxicjohann.com</a></span></p>

<h2><a id="lighthouse"></a>How to evaluate your current application?</h2>
Your question now might be where to start. There are some tools that allow you to evaluate your application against the PWA requirements. However the most easy to use is <a href="https://developers.google.com/web/tools/lighthouse/">Lighthouse</a> which is now built in <a href="https://developer.chrome.com/devtools">Chrome DevTools</a>. If you open up your developer tools and go to audit tab, you will see its logo in the middle of the page and there is an audit button which you can click to get started with your application.

<img class="alignnone size-full wp-image-318" src="https://blog.mehraban.com.au/wp-content/uploads/2018/02/Capture.png" alt="" width="602" height="409" />

Even without doing anything you could browse your application and audit it to see how compliant your app is. When you run the report you will see a report like below and there are even hints on how to fix some of those.

<img class="alignnone size-large wp-image-319" src="https://blog.mehraban.com.au/wp-content/uploads/2018/02/Capture-1-700x493.png" alt="" width="697" height="491" />

You can see how detail the report is and if you open those red items you will see what is missing.
<h2><a id="appmanifest"></a>Application manifest</h2>
Application manifest is a normal <code>JSON</code> file containing the initial flags and attributes a PWA needs. They vary from theme colour to short name which appears below the icon on your device home screen when you add it (amasingly it supports emoji's). Theme colour tells the browser what colour to choose for background on address bar and toolbar. A sample is shown in below picture.

[caption id="attachment_321" align="alignnone" width="697"]<img class="size-large wp-image-321" src="https://blog.mehraban.com.au/wp-content/uploads/2018/02/theme-color-700x537.png" alt="" width="697" height="535" /> <span style="font-size: 8pt;">                                       https://developers.google.com/web/updates/2015/08/using-manifest-to-set-sitewide-theme-color</span>[/caption]

As you can see in the right side, the background colour of the address bar is replaced with the application's theme colour to maintain the consistency of the user experience and make it more interesting. Just note that this is only supported when you open your application from home screen.

The most important attribute on application manifest is the <a href="https://developer.mozilla.org/en-US/docs/Web/Manifest#display">display mode</a>. This defines how your application is displayed when opened from home screen. There currently four modes in the specification:
<ul>
 	<li><strong>fullscreen</strong>: All of the available display area is used and no user agent <a class="glossaryLink" title="chrome: In a browser, the chrome is any visible aspect of a browser aside from the webpages themselves (e.g., toolbars, menu bar, tabs). This is not to be confused with the Google Chrome browser." href="https://developer.mozilla.org/en-US/docs/Glossary/chrome">chrome</a> is shown.</li>
 	<li><strong>standalone</strong>: The application will look and feel like a standalone application. This can include the application having a different window, its own icon in the application launcher, etc. In this mode, the user agent will exclude UI elements for controlling navigation, but can include other UI elements such as a status bar.</li>
 	<li><strong>minimal-ui</strong>: The application will look and feel like a standalone application, but will have a minimal set of UI elements for controlling navigation. The elements will vary by browser.</li>
 	<li><strong>browser</strong>: The application opens in a conventional browser tab or new window, depending on the browser and platform. This is the default.</li>
</ul>
To get a better understanding of their difference have a look at the how the application is displayed in different modes. From left to right they are <code>minimum-ui</code>, <code>standalone</code>, and <code>full screen</code>.

[caption id="attachment_324" align="alignnone" width="697"]<img class="wp-image-324 size-large" src="https://blog.mehraban.com.au/wp-content/uploads/2018/02/launch-fullscreen-700x394.png" alt="" width="697" height="392" /> photo from Chromium Blog[/caption]

The easiest way to create your application's manifest file is to use some of the tools out there. The one I like is called <em>App Manifest Generator</em> and you can find it <a href="https://app-manifest.firebaseapp.com/">here</a>.
<h2><a id="angularpwa"></a>Angular and PWA</h2>
With the introduction of <a href="https://angular.io/guide/service-worker-intro">Angular Service Worker</a> after releasing their version <code>5.0.0</code> and the Angular CLI built-in PWA support, it's now easier than ever to make your web application faster, more reliable, more engaging, and installable like a native one.

Let's see what they say about their new addition to the family:
<blockquote>Angular's service worker is designed to optimize the end user experience of using an application over a slow or unreliable network connection, while also minimizing the risks of serving outdated content.</blockquote>
To use Angular service workers, you must have the following Angular and CLI versions:
<ul>
 	<li>Angular 5.0.0 or later.</li>
 	<li>Angular CLI 1.6.0 or later.</li>
</ul>
<h2><a id="ngsw"></a>Angular Service Worker aka (ngsw)</h2>
In previous versions of Angular, you had to use a third party library like <code>sw-precache</code> or <a href="https://developers.google.com/web/tools/workbox/">workbox</a> to add a service worker to your application. <a href="https://angular.io/">Angular</a> team have spent a fair amount of time on creating their own service worker aka <code>ngsw</code> and adding the support to its CLI which you can add to your project with a couple of commands. The first one would be obviously to install it:
<pre class="lang:js decode:true">npm install @angular/service-worker --save</pre>
At this point there would be two possible scenario, either you already have an Angular application and want to add PWA support to it, or you are creating a new application. I will go through the former in another post.

In terms of the later, it would be very easy:
<pre class="lang:js decode:true ">ng new angular-pwa-app --service-worker</pre>
And you've got the basic generated for you to <em>progressify</em> your application. This means you now should have configuration file <code>ngsw-config.json</code> in your project which tell service worker what to do. You should also have the service worker itself <code>ngsw-worker.js</code> in your <code>node_module</code> folder.

Here is what's inside the configuration file:
<pre class="lang:js decode:true ">{
  "index": "/index.html",
  "assetGroups": [{
    "name": "app",
    "installMode": "prefetch",
    "resources": {
      "files": [
        "/favicon.ico",
        "/index.html"
      ],
      "versionedFiles": [
        "/*.bundle.css",
        "/*.bundle.js",
        "/*.chunk.js"
      ]
    }
  }, {
    "name": "assets",
    "installMode": "lazy",
    "updateMode": "prefetch",
    "resources": {
      "files": [
        "/assets/**"
      ]
    }
  }]
}</pre>
As you can see the most important part in this file is about caching mechanism and which files to cache for the application. We will go through these in details later.

You will also have a flag set in your <code>.angular-cli.json</code>:
<pre class="lang:js decode:true "> "serviceWorker": true</pre>
This flag will cause the production build to include a couple of extra files in the output dist folder:
<ul>
 	<li>The Angular Service Worker file <code>ngsw-worker.js</code></li>
 	<li>The runtime configuration of the Angular Service Worker <code>ngsw.json</code></li>
</ul>
The last bit but also important is that it will add the <code>ServiceWorkerModule</code> to your <code>app.module.ts</code> file and configure it for production.
<pre class="lang:js decode:true ">@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}</pre>
This module provides a couple of injectable services:
<ul>
 	<li><code>SwUpdate</code> for managing application version updates</li>
 	<li><code>SwPush</code> for doing server Web Push notifications</li>
</ul>
You won't need to know what is inside the service worker file itself and you cannot change that either (it will be overwritten by each build), but I recommend you have a look at <a href="https://github.com/angular/angular/tree/master/packages/service-worker/worker/src">the code</a> to understand some of the techniques which is used, interesting stuff.
<blockquote>This file has its own HTTP request so that the browser would know which if there is a newer version of the service worker available.</blockquote>
The Angular Service Worker is nothing but a javascript file subscribing to service worker life cycles and handling different stuff in there.
<h2><a id="hood"></a>Under the hood</h2>
The Angular Service Worker can cache all sorts of files/content in the browser's <a href="https://developer.mozilla.org/en-US/docs/Web/API/CacheStorage">Cache Storage</a>. It doesn't use the normal caching mechanism which is used in the standard browsers called <code>cache-control</code> so it can be used in conjunction with that.

There were two sections in the  <code>assetGroup</code> in configuration file's, the <code>app</code> and <code>assets</code>. The former is used to let Angular Service Worker know what files need to be cached from application's main files.

This usually include <code>index.html</code>, css files and main bundles. The assets section is used for anything that doesn't need to be loaded at first like images and other assets which would be loaded later on demand.

There were also two different install/update mode mentioned in the configuration, <code>prefetch</code> and <code>lazy</code>.

<strong><em>Prefetch</em> </strong>means that the files are cached ahead of time and <strong><em>lazy</em> </strong>is used for on demand caching, meaning they will be cached on their first usage.

OK let's build the application and have a look at what will be generated in the dist folder:
<pre class="lang:js decode:true ">ng build --prod</pre>
If you now open your dist folder you will see something similar to this:

<img class="alignnone wp-image-326 " src="https://blog.mehraban.com.au/wp-content/uploads/2018/02/ngsw-pwa-dist-700x369.png" alt="" width="562" height="296" />

We've talked about the service worker itself, so let's have a look at the <code>ngsw.json</code> to see how the template helped to generate this file.

This is the <em>runtime</em> configuration file that the Angular Service Worker will use and is built based on the <code>ngsw-config.json</code>.

It contains all the information needed by the Angular Service Worker to know at runtime about which files it needs to cache, and when.
<pre class="lang:js decode:true ">{
  "configVersion": 1,
  "index": "/index.html",
  "assetGroups": [
    {
      "name": "app",
      "installMode": "prefetch",
      "updateMode": "prefetch",
      "urls": [
        "/favicon.ico",
        "/index.html",
        "/inline.5646543f86fbfdc19b11.bundle.js",
        "/main.3bb4e08c826e33bb0fca.bundle.js",
        "/polyfills.55440df0c9305462dd41.bundle.js",
        "/styles.1862c2c45c11dc3dbcf3.bundle.css"
      ],
      "patterns": []
    },
    {
      "name": "assets",
      "installMode": "lazy",
      "updateMode": "prefetch",
      "urls": [],
      "patterns": []
    }
  ],
  "dataGroups": [],
  "hashTable": {
    "/inline.5646543f86fbfdc19b11.bundle.js": "1028ce05cb8393bd53706064e3a8dc8f646c8039",
    "/main.3bb4e08c826e33bb0fca.bundle.js": "ae15cc3875440d0185b46b4b73bfa731961872e0",
    "/polyfills.55440df0c9305462dd41.bundle.js": "c3b13e2980f9515f4726fd2621440bd7068baa3b",
    "/styles.1862c2c45c11dc3dbcf3.bundle.css": "3318b88e1200c77a5ff691c03ca5d5682a19b196",
    "/favicon.ico": "84161b857f5c547e3699ddfbffc6d8d737542e01",
    "/index.html": "cfdca0ab1cec8379bbbf8ce4af2eaa295a3f3827"
  }
}</pre>
First of all there is the assetGroup section which now contains all the required files with their bundle id's included. Then you can see there is a hash table generated containing the file names and a hash value generated based on the name. This hash table is used for versioning purposes.

Let's say you update your main style file, what happens next is that it's id will change. As a result the hash value will change and service worker knows then that it needs to be requested again instead of responding with the cached version.

You might ask where that <code>manifest.json</code> came from. That is not something that Angular generates, it is the application manifest that you should generate and put in your project and then reference it in your <code>.angular-cli.json</code>.
<pre class="lang:js decode:true">"apps": [
    {
      "root": "src",
      "outDir": "dist",
      "assets": [
        "assets",
        "favicon.ico",
        "assets\\manifest.json"
      ],
    }
    ...
]</pre>
If you want to run your application to see whether the service worker is registered or not, be mindful of the fact that you cannot do it in non prod mode and you will need a web server for it. You could use the CLI dev server but that is not also not recommended but also it won't pass the security part of the audit step in lighthouse.

The best and simplest option is to install the <a href="https://www.npmjs.com/package/http-server">http-server</a> and use that, but first we need to install it globally:
<pre class="lang:js decode:true ">npm install -g http-server</pre>
Now let's then go into the <code>dist</code> folder, and start the application in production mode:
<pre class="lang:sh decode:true ">cd dist
http-server -c-1 .</pre>
At this point the server will be initialised and serving from this folder as base, you can browse <span style="text-decoration: underline;"><em>http://127.0.0.1:8080</em></span> or <span style="text-decoration: underline;"><em>http://localhost:8080</em></span> to see your application and run the audit to see what else is remaining.

If you open the developer tools, you should see the service worker registered for your application by going into application tab:

<img class="alignnone size-full wp-image-330" src="https://blog.mehraban.com.au/wp-content/uploads/2018/02/ngsw-1.png" alt="" width="682" height="302" />

You can see what files have been cached so far by opening the cache section:

<img class="alignnone size-large wp-image-331" src="https://blog.mehraban.com.au/wp-content/uploads/2018/02/1_K9cjBfajBRN5f5RCOgZp7g-700x349.png" alt="" width="697" height="348" />

The Angular Service Worker will start serving the application files the next time you load the page. If you hit refresh, you will notice that the application starts much faster this time (note that the first time the service worker get's registered, so caching starts after that).
<h2><a id="otherresource"></a>Extending the configuration, caching other resources</h2>
When you are adding Angular Service Worker to your existing application or when you have a more complex project calling web API endpoints to get data or maybe you are including some static resources from an <a href="https://en.wikipedia.org/wiki/Content_delivery_network">external CDN</a>.

You can cache those items easily by extending the configuration file. If you remember from the snippet above, there was an empty section called <code>dataGroups</code>.

In this section you can easily add these kind of resources and set a whole bunch of caching configuration for them. So let's see what is available.

We start with fonts which are the most obvious case, this would also go in <code>assetGroup</code> section. I'm using google fonts but this can be from anywhere. All you need to do is to add the <code>urls</code> property in the assets with lazy install mode since you don't want to slow down your application load time by loading the fonts first.
<pre class="lang:js decode:true">{
  "name": "assets",
  "installMode": "lazy",
  "updateMode": "prefetch",
  "resources": {
    "files": ["/assets/**"],
    "urls": [
      "https://fonts.googleapis.com/**"
    ]
  }
}</pre>
This makes sure that any font (using wildcard) requested from <span style="text-decoration: underline;">fonts.googleapis.com</span> will get cached and served from there on future requests.

In terms of API's the <code>dataGroup</code> comes to play. We will need to tell service worker which routes are to be used, the size of cached items, their life time in cache (expiry) and also time out if the network request fails.
<pre class="lang:js decode:true ">"dataGroups": [
  {
    "name": "books-api",
    "urls": ["/books"],
    "cacheConfig": {
      "strategy": "freshness",
      "maxSize": 20,
      "maxAge": "1h",
      "timeout": "5s"
    }
  },
  {
    "name": "book-api",
    "urls": ["/book/:id"],
    "cacheConfig": {
      "strategy": "performance",
      "maxSize": 10,
      "maxAge": "1d"
    }
  }
]</pre>
The most important part of the above config is the strategy. There are currently two values available, <code>freshness</code> and <code>performance</code>. The first one is equal to <strong>network first</strong>, meaning the resource is requested from network first and if not available from cache.

The second one is equal to <strong>cache first</strong> means it is returned from cache first and if it does not exist on cache it will be requested from network.

<strong>Max size</strong> determines for how many entries should be kept in cache, because we don't want to take too much space in browser cache and cause problems. <strong>Max age</strong> is used to determine how long responses are allowed to remain in the cache before being considered invalid and evicted.

You can have these suffixes:
<ul>
 	<li><code>d</code>: days</li>
 	<li><code>h</code>: hours</li>
 	<li><code>m</code>: minutes</li>
 	<li><code>s</code>: seconds</li>
 	<li><code>u</code>: milliseconds</li>
</ul>
After configuring these options you can now try to set your app to offline in dev tools and see what happens. It does feel good to see the application working without a network connection, doesn't it.

<img class="alignnone wp-image-333 size-full" src="https://blog.mehraban.com.au/wp-content/uploads/2018/02/Capture-2.png" alt="" width="3292" height="982" />
<h2><a id="push"></a>Push notifications</h2>
To me the most impressing feature coming with PWAs is the push notification. This somehow completes the native user experience alongside the <em>add to home screen</em> feature.

The good news is that this is supported by default in Angular and you don't need to put too much effort in getting it working. We will however need to follow some conventions to implement the functionality in our API (as its needed for this purpose).

First thing we need to do is to subscribe to the notifications. We will need <code>SwPush</code> from the Angular Service Worker to implement this:
<pre class="lang:js decode:true">import { SwPush } from '@angular/service-worker';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
...

  constructor(private swPush: SwPush, private http: HttpClient) {}
  VAPID_PUBLIC_KEY = 'your VAPID private key';
  API_URL = 'the api endpoint which supports push notification';

  subscribeToPush() {

    // Requesting messaging service to subscribe current client (browser)
    this.swPush.requestSubscription({
      serverPublicKey: this.VAPID_PUBLIC_KEY
    })
      .then(pushSubscription =&gt; {

        // Passing subscription object to our backend
        this.addSubscriber(pushSubscription)
          .subscribe(
            res =&gt; {
              console.log('[App] Add subscriber request answer', res);
            },
            err =&gt; {
              console.log('[App] Add subscriber request failed', err);
            })
      })
      .catch(err =&gt; {
        ...
      })

  }

addSubscriber(subscription) {

    const url = `${this.API_URL}`;
    console.log('[Push Service] Adding subscriber')

    let body = {
      action: 'subscribing to the push endpoint',
      subscription: subscription
    }

    return this.http
      .post(url, body)
      .catch(this.handleError);

  }
private handleError(error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      errMsg = `${error.statusText || 'Network error'}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    return Observable.throw(errMsg);
  }</pre>
Let me break this down and explain it step by step.

The first step is to subscribe to your web push endpoint (this is not your back-end server) which is responsible for sending push notifications. This is like establishing a connection with a server and keeping that open so they can send us the notifications later through that (of course this was just an example and not reality).

To do this we need to have a valid <a href="https://tools.ietf.org/html/draft-thomson-webpush-vapid-02">Voluntary Application Server Identification</a> (VAPID) public key from our sever which <code>ngsw</code> will use to subscribe to the push endpoint. If you are wondering about these concepts and don't have enough background refer to <a href="https://tools.ietf.org/html/draft-ietf-webpush-protocol">Web Push Protocol</a> specifications.

In short the whole process looks like this:

<img class="alignnone size-full wp-image-339" src="https://blog.mehraban.com.au/wp-content/uploads/2018/02/web-push.jpg" alt="" width="638" height="266" />

As soon as you subscribe, you will start getting notifications. At this point I haven't implemented the push notification in the demo application, but I will add it in my next blog post.
<h4>Considerations with push notifications using ngsw</h4>
<ul>
 	<li>You nee to send notification data straight away with the send notification request as payload (NGSW can’t request this payload later, which is possible in general).</li>
 	<li>You have to send this data object in the <code class="markup--code markup--li-code">notification</code> property of the payload.</li>
</ul>
A normal payload structure will look like:
<pre class="lang:js decode:true">{
  "notification": {
    "title": "The push notification title",
    "actions": [
      {
        "action": "actionOne",
        "title": "Action One"
      }
    ],
    "body": "The is the body which will be shown on notification",
    "dir": "auto",
    "icon": "path to icon",
    "badge": "path to badge",
    "lang": "en",
    "renotify": true,
    "requireInteraction": true,
    "tag": 926796012340920300,
    "vibrate": [
      300,
      100,
      400
    ],
    "data": {
      // this object can contain arbitrary info
    }
  }
}</pre>
Hope this article has helped you to get started with PWAs using Angular. Don't forget to spread the love fellas.
