type File = {
	upload(file: Buffer, fileName: string): Promise<string>;
};

export { type File };
