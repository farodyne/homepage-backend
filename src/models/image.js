/**
 * Author: Federico Engler
 *
 * A model class used for representing an album image in our collection
 * of images.
 */
class Image {
    /**
     * Constructs a representation of an image.
     * @param {string} url - The URL to the image.
     * @param {string} caption - The caption of the image.
     */
    constructor(url, caption) {
        this.url = url;
        this.caption = caption;
    }
}

export default Image;
