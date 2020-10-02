# testAutomation
puppeteer DreamLand testAutomation




**Project description**


This is a browser automation tool that uses puppeteer to go trough the funnel of requesting a test drive of a skoda.

At this test drive request funnel 
https://cloud.mail.dieteren.be/mynew/cars?lang=nl&brand=skoda


The END RESULT 
https://test-automation-dieteren.herokuapp.com/


The puppeteer part works specifically for this funnel, but the shell can be easly reused for other funnels, webtools or pages.


**Google Optimize preview link**


The google optimize preview link sets a cookie in the browser.
Which enables the browser see the B variant of an AB test experiment.

**Main Goal**


The main goal of this project is to reduce the QA time needed to manually test AB test variants on different devices and browsers. 



- Does tracking work?
- Visual errors? 
- Technical errors?



**Main Dependencies**


- node.js
- puppeteer
- fs
