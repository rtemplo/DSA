interface CarouselItem {
  id: number;
  content: string;
  prev?: CarouselItem | undefined;
  next?: CarouselItem | undefined;
}

const carouselItems: CarouselItem[] = [
  { id: 1, content: "Slide 1" },
  { id: 2, content: "Slide 2" },
  { id: 3, content: "Slide 3" },
];

// Link them manually
carouselItems.forEach((item, index, arr) => {
  item.prev = arr[(index - 1 + arr.length) % arr.length]; // wrap around
  item.next = arr[(index + 1) % arr.length]; // wrap around
});
