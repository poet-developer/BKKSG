const StopScroll = () => {
     document.body.style.overflow = "hidden";
}

const EnableScroll = () => {
     document.body.style.overflow = "unset"
}

export {StopScroll, EnableScroll}