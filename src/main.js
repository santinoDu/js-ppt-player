window.pptPlayer = (function (window, document) {
    var run = function (generatorFunction) {
        var resume = function (callbackValue) {
            generatorItr.next(callbackValue)
        }
        var generatorItr = generatorFunction(resume)
        generatorItr.next()
    }

    var frames = document.querySelectorAll('.frame')

    var setCss = {
        opacity: function (el, val) {
            el.style.opacity = val
        },
        scale: function (el, val) {
            el.style.transform = 'scale('+ val +')'
        },
        duration: function (el, val) {
            el.style.transitionDuration = val + 'ms'
        }
    }
    var setProperty = function (step, str) {
        var arr = str.split(':')
        var key = arr[0].trim()
        var value = arr[1]
        if (setCss.hasOwnProperty(key)) {
            setCss[key].call(null, step, value)
        }
    }

    var getDuration = function (arr) {
        var duration = 0
        arr.forEach(val => {
            var itemArr = val.split(':')
            if (itemArr[0].trim() === 'duration') {
                duration = itemArr[1].trim()
            }
        })
        return duration
    }

    var setProperties = function (step, properties, callback) {
        var interval = Number(getDuration(properties))
        properties.forEach(function (property) {
            setProperty(step, property)
        })
        setTimeout(callback, interval)
    }

    var setTime = function (step, callback) {
        run(function* (resume) {
            var arr = ['init', 'in', 'stay', 'out']
            var len = arr.length
            for (var i = 0; i < len; i++) {
                var val = arr[i]
                var name = 'data-' + val
                if (!step.hasAttribute(name)) return
                var properties = step.getAttribute(name).split(';')
                yield setProperties(step, properties, resume)
                if (i === len - 1) {
                    callback()
                }
            }
        })
    }
    var start = function (frame, callback) {
        var steps = frame.querySelectorAll('.step')

        steps.forEach(function (step) {
            setTime(step, callback)
        })
    }

    var showTheFrame = function (frame) {
        var active = document.querySelector('.frame-active')
        if (active) {
            active.classList.remove('frame-active')
        }
        frame.classList.add('frame-active')
        if (frame.hasAttribute('data-audio')) {
            var src = frame.getAttribute('data-audio')
            var audio = document.createElement('audio')
            audio.src = src
            audio.play()
        }

        if (frame.hasAttribute('data-video')) {
            var src = frame.getAttribute('data-video')
            var video = document.createElement('video')
            video.src = src
            video.style.cssText = 'position: fixed; left: 0; width: 100%; top: 50%; transform: translate3d(0, -50%, 0)'
            frame.querySelector('.step').appendChild(video)
            video.play()
        }
    }
    var timeStart = Date.now()

    var ppt = function () {
        run(function* (resume) {
            var i = 0
            var len = frames.length
            var frame
            for (; i < len; i++) {
                frame = frames[i]
                showTheFrame(frame)
                yield start(frame, resume)
            }
            console.log(Date.now() - timeStart, 'time')
        })
    }

    return ppt

}(window, document))


