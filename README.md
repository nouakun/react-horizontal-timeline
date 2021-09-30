![image](https://twinkble.github.io/react-horizontal-timeline/logo.png)

# React Horizontal Timeline
[![npm version](https://badge.fury.io/js/react-horizontal-timeline.svg)](https://badge.fury.io/js/react-horizontal-timeline)
[![Build Status](https://travis-ci.org/twinkble/react-horizontal-timeline.svg?branch=master)](https://travis-ci.org/twinkble/react-horizontal-timeline)
[![Code Climate](https://codeclimate.com/github/twinkble/react-horizontal-timeline/badges/gpa.svg)](https://codeclimate.com/github/twinkble/react-horizontal-timeline)
[![Dependency Status](https://david-dm.org/twinkble/react-horizontal-timeline.svg)](https://david-dm.org/twinkble/react-horizontal-timeline)
[![devDependency Status](https://david-dm.org/twinkble/react-horizontal-timeline/dev-status.svg)](https://david-dm.org/twinkble/react-horizontal-timeline#info=devDependencies)
[![devDependency Status](https://david-dm.org/twinkble/react-horizontal-timeline/peer-status.svg)](https://david-dm.org/twinkble/react-horizontal-timeline#info=peerDependencies)

A React port of the horizontal time-line developed by [sherubthakur](https://github.com/sherubthakur/react-horizontal-timeline) and re-developed by [twinkble](https://github.com/twinkble)

Here is a **[demo](https://react-horizontal-timeline.herokuapp.com/)** I hope you too are a fan of the elder scrolls.

## NOTE
The original package [sherubthakur/react-horizontal-timeline](https://github.com/sherubthakur/react-horizontal-timeline) is no longer maintained, and I re-developed the package and added additional features.


# Support
I will appreciate your support to keep me going on maintaining & making packages like this one.

<a href="https://ko-fi.com/Z8Z16EGRS">
<img height="41" src="https://cdn.ko-fi.com/cdn/kofi3.png?v=3" title="Support me" width="141"/>
</a>

## HorizontalTimeline

It will just render a timeline with the titles (can be dates or anything) that you provided, and it is up to you what to do when a title is selected. i.e. it will give you the index of the title that was clicked, and you can do anything with it.

Property	                  |	Type   	     |	Default	                      |	Description
:--------------------------|:--------------|:-------------------------------|:--------------------------------
 values (**required**)     | array         | undefined                      | **sorted** array of dates (format:**yyyy-mm-dd**)
 indexClick (**required**) | function      | undefined                      | function that takes the index of the array as argument
 index (**required**)      | number        | undefined                      | the index of the selected date
 getLabel                  | function      | date.toDateString().substring(4) |  A function to calculate the label of the event based on the date of the event
 minEventPadding           | number        | 20                             | The minimum padding between two event labels
 maxEventPadding           | number        | 120                            | The maximum padding between two event labels
 linePadding               | number        | 100                            | Padding used at the start and end of the timeline
 labelWidth                | number        | 85                             | The width of an individual label
 fillingMotion             | object        |{ stiffness: 150, damping: 25 } | Sets the animation style of how filling motion will look
 slidingMotion             | object        |{ stiffness: 150, damping: 25 } | Sets the animation style of how sliding motion will look
 styles                    | object        |{ background: '#f8f8f8', foreground: '#7b9d6f', outline: '#dfdfdf' } | object containing the styles for the timeline currently outline (the color of the boundaries of the timeline and the buttons on it's either side), foreground (the filling color, active color) and background (the background color of your page) colors of the timeline can be changed.
 isTouchEnabled            | boolean       | true                           | Enable touch events (swipe left, right)
 isKeyboardEnabled         | boolean       | true                           | Enable keyboard events (up, down, left, right)
 isOpenBeginning           | boolean       | true                           | Show the beginning of the timeline as open ended
 isOpenEnding              | boolean       | true                           | Show the ending of the timeline as open ended
 isRtl                     | boolean       | false                          | Used for RTL languages, when this option is true, the direction of the timeline will be from right to left.

This is how it can be used.

```tsx
import HorizontalTimeline from 'react-horizontal-timeline';

/*
Format: YYYY-MM-DD
Note: Make sure dates are sorted in increasing order
*/
const VALUES = [
    '2008-06-01',
    '2010-06-01',
    '2013-06-01',
    '2015-03-01',
    '2019-01-01',
    '2019-06-17',
    '2019-08-01',
];

export default class App extends React.Component {
  state = { value: 0, previous: 0 };

  render() {
    return (
      <div>
        {/* Bounding box for the Timeline */}
        <div style={{ width: '60%', height: '100px', margin: '0 auto' }}>
          <HorizontalTimeline
            index={this.state.value}
            indexClick={(index) => {
              this.setState({ value: index, previous: this.state.value });
            }}
            values={ VALUES } />
        </div>
        <div className='text-center'>
          {/* any arbitrary component can go here */}    
          {this.state.value}
        </div>
      </div>
    );
  }
}

```
For more advanced usage take a look at the demos directory.

## Running the development version
- Just clone the repo and do an `npm install` (or `yarn install`)
- Note: You will need to do `npm install react react-dom` to install `peerDependencies` as both `yarn` and `npm` don't do this.
- Run `npm run start`/`npm start`/`yarn start`.
- Then go to `localhost:5001/demos/<demo_name>/index.html` to see the fruits of your labor.

#### Here is the information provided by the original author.

An easy to customize, horizontal timeline powered by CSS and jQuery.

