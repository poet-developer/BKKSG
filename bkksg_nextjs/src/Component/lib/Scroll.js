
/**
 * Search Modal을 띄울 때, 모달 외에 나머지 부분은 스크롤을 못하게 한다.
 */

const StopScroll = () => {
     document.body.style.overflow = "hidden";
}

const EnableScroll = () => {
     document.body.style.overflow = "unset"
}

export {StopScroll, EnableScroll}