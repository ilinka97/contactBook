package com.example.service;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class ContactPhotoService {
	
	@Value("${file.upload-dir}")
	private String fileUpoadDir;

	public String savePhoto(MultipartFile file) {
		try {
			byte[] bytes = file.getBytes();
			Path path = Paths.get(fileUpoadDir + file.getOriginalFilename());
			Files.write(path, bytes);
		} catch (IOException e) {
			e.printStackTrace();
		}
		return file.getOriginalFilename();
	}
	public File findOnePhoto(String photoFilename) throws IOException {
		return Paths.get(fileUpoadDir + photoFilename).toFile();
	}
	public void deletePhoto(String photoFilename) throws IOException {
		Files.deleteIfExists(Paths.get(fileUpoadDir, photoFilename));
	}
}
