![image](https://twinkble.github.io/react-horizontal-timeline/logo.png)

# React Horizontal Timeline
[![npm version](https://badge.fury.io/js/@cielblog/react-horizontal-timeline.svg)](https://badge.fury.io/js/react-horizontal-timeline)
[![Build Status](https://travis-ci.org/twinkble/react-horizontal-timeline.svg?branch=master)](https://travis-ci.org/twinkble/react-horizontal-timeline)
[![Code Climate](https://codeclimate.com/github/twinkble/react-horizontal-timeline/badges/gpa.svg)](https://codeclimate.com/github/twinkble/react-horizontal-timeline)
[![Dependency Status](https://david-dm.org/twinkble/react-horizontal-timeline.svg)](https://david-dm.org/twinkble/react-horizontal-timeline)
[![devDependency Status](https://david-dm.org/twinkble/react-horizontal-timeline/dev-status.svg)](https://david-dm.org/twinkble/react-horizontal-timeline#info=devDependencies)
[![devDependency Status](https://david-dm.org/twinkble/react-horizontal-timeline/peer-status.svg)](https://david-dm.org/twinkble/react-horizontal-timeline#info=peerDependencies)

A React port of the horizontal time-line developed by [sherubthakur](https://github.com/sherubthakur/react-horizontal-timeline) and re-developed by [twinkble](https://github.com/twinkble)

Here is a **[demo](https://react-horizontal-timeline.herokuapp.com/)**.

## NOTE
The original package [sherubthakur/react-horizontal-timeline](https://github.com/sherubthakur/react-horizontal-timeline) is no longer maintained, and I re-developed the package and added additional features.


# Support
I will appreciate your support to keep me going on maintaining & making packages like this one.

<a href="https://ko-fi.com/Z8Z16EGRS">
<img height="41" src="https://cdn.ko-fi.com/cdn/kofi3.png?v=3" title="Support me" width="141"/>
</a>

# Install

```bash
$ yarn insall @cielblog/react-horizontal-timeline

// Or use npm
$ npm install @cielblog/react-horizontal-timeline
```

## API

It will just render a timeline with the titles (can be dates or anything) that you provided, and it is up to you what to do when a title is selected. i.e. it will give you the index of the title that was clicked, and you can do anything with it.

| Property            | Type       | Required? | Default                                                                | Description                                                                                                                                                                                                                                                                               |
|---------------------|------------|-----------|------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `titles`            | `string[]` | ✅         | `undefined`                                                            | **Stored** array of titles.                                                                                                                                                                                                                                                               |
| `index`             | `number`   | ✅         | `undefined`                                                            | The index of the selected title.                                                                                                                                                                                                                                                          |
| `onTitleClick`      | `function` | ✅         | `undefined`                                                            | Function that takes the index of array as argument.                                                                                                                                                                                                                                       |
| `renderTitles`      | `function` |           | `string`                                                               | Custom rendering title function.                                                                                                                                                                                                                                                          |
| `maxEventPadding`   | `number`   |           | `20`                                                                   | The minimum padding between two event titles.                                                                                                                                                                                                                                             |
| `maxEventPadding`   | `number`   |           | `120`                                                                  | The maximum padding between two event titles.                                                                                                                                                                                                                                             |
| `linePadding`       | `number`   |           | `100`                                                                  | Padding used at the start and end of the timeline,                                                                                                                                                                                                                                        |
| `titleWidth`        | `number`   |           | `85`                                                                   | The width of an individual title.                                                                                                                                                                                                                                                         |
| `fillingMotion`     | `object`   |           | `{ stiffness: 150, damping: 25 }`                                      | Sets the animation style of how filling motion will look.                                                                                                                                                                                                                                 |
| `slidingMotion`     | `object`   |           | `{ stiffness: 150, damping: 25 }`                                      | Sets the animation style of how sliding motion will look.                                                                                                                                                                                                                                 |
| `styles`            | `object`   |           | `{ background: '#f8f8f8', foreground: '#7b9d6f', outline: '#dfdfdf' }` | Object containing the styles for the timeline currently outline (the color of the boundaries of the timeline and the buttons on it's either side), foreground (the filling color, active color) and background (the background color of your page) colors of the timeline can be changed. |
| `isRtl`             | `boolean`  |           | `false`                                                                | Used to make the timeline support RTL languages.                                                                                                                                                                                                                                          |
| `isTouchEnabled`    | `boolean`  |           | `true`                                                                 | Enable touch events (swipe left, right).                                                                                                                                                                                                                                                  |
| `isKeyboardEnabled` | `boolean`  |           | `true`                                                                 | Enable keyboard events (up, down, left, right).                                                                                                                                                                                                                                           |
| `isOpenBeginning`   | `boolean`  |           | `true`                                                                 | Show the ending of the timeline as open ended.                                                                                                                                                                                                                                            |


# Usage

```tsx
import React, {useState} from 'react'
import HorizontalTimeline from "@cielblog/react-horizontal-timeline";

const TITLES = [
    'Title1',
    'Title 2',
    'Title 3',
];

export const MyTimeline = (props) => {
    const [current, setCurrent] = useState(0)
    
    return (
        <div>
            <HorizontalTimeline titles={TITLES} index={current} onTitleClick={(index) => setCurrent(index)}/>
        </div>
    )
}
```