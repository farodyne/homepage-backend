/**
 * Author: Federico Engler
 *
 * A model class used for representing an album in our collection of images
 * and videos.
 */
import Image from './image';
import { settings } from '../utils';

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

        this.images = album.images.map(
            (image) => new Image(`${settings.contentUrl}/${album.type}/${album.id}/${image.id}.jpg`, image.caption)
        );

        // Fix this better with proper class for videos and images.
        this.videos = album.videos ? album.videos.map((video) => new Image(video.url, video.caption)) : [];
    }
}

export default Album;
