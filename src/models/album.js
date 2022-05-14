/**
 * Author: Federico Engler
 *
 * A model class used for representing an album in our collection of images
 * and videos.
 */
import Image from './image';
import Video from './video';
import { environment } from '../utils';

class Album {
    /**
     * Creates a frontend model instance of an album.
     * @param {Object} album - The database representation for the album.
     */
    constructor(album) {
        this.id = album.id;
        this.created = album.created;
        this.type = album.type;
        this.caption = album.caption;
        this.width = album.width || 1275;

        // If the album contains images, transform the array to an array
        // of frontend image models.
        this.images = album.images
            ? album.images.map((image) => {
                  const url = `${environment.contentUrl}/${album.type}/${album.id}/${image.id}.jpg`;
                  return new Image(url, image.caption);
              })
            : [];

        // If the album contains videos, transform the array to an array
        // of frontend video models.
        this.videos = album.videos ? album.videos.map((video) => new Video(video.url, video.caption)) : [];
    }
}

export default Album;
