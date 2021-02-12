// @flow
"use strict";
const jimp = require("jimp");
const utilsService = require("./utilsService.js");
const path = require("path");
const axios = require("axios");

class ImageService {

	static async getImage(outerImg: string) {

		let outImage;

		try {

			if (Array.isArray(outerImg)) {

				outImage = await this.createMergeImages(outerImg);

			} else {

				outImage = await jimp.read(outerImg);

			}

			return outImage;

		} catch (error) {

			try {

				const response = await axios({
					method: "get",
					url: outerImg,
					responseType: "arraybuffer"
				});

				outImage = await jimp.read(response.data);

				return outImage;

			} catch (err) {

				outImage = await jimp.read(path.join(__dirname, "..", "src", "assets", "caca-de-whatsapp-triste.jpg"));
				return outImage;

			}

		}

	}

	static async mergeLimitImages(innerImg: string, outerImg: string, maskImg: string) {

		console.log(innerImg);
		console.log(outerImg);
		console.log(maskImg);

		const outImage = await this.getImage(outerImg, 0);

		const inImage = await this.getImage(innerImg, 0);

		const mascara = await this.getImage(maskImg, 0);

		//console.log(outImage);
		//console.log(inImage);
		//console.log(mascara);

		outImage.mask(mascara);
		inImage.blit(outImage, 0, 0);
		return inImage.getBufferAsync(jimp.MIME_PNG);

	}

	static async mergeImages(images: Array<string>) {

		const inImage = await this.createMergeImages(images);
		return inImage.getBufferAsync(jimp.MIME_PNG);

	}

	static async createMergeImages(images: Array<string>) {

		let [baseImg, ...restImg] = images;
		let base;
		try {

			base = await jimp.read(baseImg);

		} catch (e) {

			[baseImg, ...restImg] = restImg;
			base = await jimp.read(baseImg);

		}

		for (const image of restImg) {

			try {

				const outImage = await jimp.read(image);
				base.composite(outImage, 0, 0);

			} catch (e) {

				console.log("ERRORORRORORORO");
				console.log(e);

			}

		}
		return base;

	}

	static async createHibridService(x: number, y: number, z: number, innerService: string, outerService: string, maskService: string) {

		let inIndex = -1;
		if (z > 7) {

			inIndex = utilsService.tileInIndex(x, y, z);

		}

		if (inIndex === 2) {

			const imgMerged = await this.mergeLimitImages(innerService, outerService, maskService);
			return {type: "image", image: imgMerged};

		} else {

			const url = (inIndex === 1) ? innerService : outerService;
			if (Array.isArray(url)) {

				const imgMerged = await this.mergeImages(url);
				return {type: "image", image: imgMerged};

			} else {

				return {type: "url", url: url};

			}

		}

	}

}

module.exports = ImageService;
