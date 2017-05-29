# js-ppt-player
a js Cards of Html play library


## usage
card structure
``` html
<div class="frame frame-active">
        <div class="center">
            <div class="step"
                 data-init="opacity:0; scale: .4"
                 data-in="opacity: 1; scale: 1; duration: 1000"
                 data-stay="duration: 1000"
                 data-out="opacity: 0; duration: 500">
                This Summer
            </div>
        </div>
    </div>
```

In each card (which className is frame) may has some animate elements (which className is step).
In each step has 4 attributes as lifecycle hooks:
- **data-init**
- **data-in**
- **data-stay**
- **data-out**

Write those attrbutes, you can css (for now, only support `opacity`, `scale`, `duration`).
You can also set `data-video` or `data-audio` in each frame for video play or audio background play.
