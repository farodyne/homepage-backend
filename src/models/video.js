/**
 * Author: Federico Engler
 *
 * A model class used for representing an album video in our collection
 * of videos.
 */
class Video {
    /**
     * Constructs a representation of an album video.
     * @param {string} url - The URL to the video.
     * @param {string} caption - The caption of the video.
     */
    constructor(url, caption) {
        this.url = url;
        this.caption = caption;
    }
}

export default Video;
