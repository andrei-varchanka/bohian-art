import {Painting} from "../api/models/painting";

export function getImageSrc(painting: Painting): string {
  return 'data:image/jpeg;base64, ' + painting.image.data;
}
