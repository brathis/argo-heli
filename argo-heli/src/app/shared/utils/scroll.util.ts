export function scrollIntoViewHorizontally(
  containerElement: HTMLElement,
  scrollElement: HTMLElement,
) {
  const scrollContainerWidth = containerElement.offsetWidth;
  const scrollItemWidth = scrollElement.scrollWidth;
  const visiblePadding = (scrollContainerWidth - scrollItemWidth) / 2;
  const scrollContainerOffsetLeft = containerElement.offsetLeft;
  const scrollItemOffsetLeftRelativeToParent =
    scrollElement.offsetLeft - scrollContainerOffsetLeft;
  const scrollLeft = scrollItemOffsetLeftRelativeToParent - visiblePadding;
  containerElement.scroll({
    left: scrollLeft,
    behavior: 'smooth',
  });
}
