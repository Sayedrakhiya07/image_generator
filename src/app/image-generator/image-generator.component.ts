import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-image-generator',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './image-generator.component.html',
  styleUrl: './image-generator.component.scss',
})
export class ImageGeneratorComponent {

  prompt: string = '';
  generatedImageUrl: string | null = null;


  generateImage() {
    if (!this.prompt.trim()) {
      alert('Please enter a prompt!');
      return;
    }

    const payload = { prompt: this.prompt };
    // fetch('http://122.163.121.176:3004/generate_image',
    fetch('http://192.168.1.200:3020/generate_image',
     {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    }).then(response => {
      if (!response.ok) {
        throw new Error('Failed to generate image');
      }
      return response.json();
    }).then(data => {
      // fetch("http://122.163.121.176:3004/get_image",
      fetch("http://192.168.1.200:3020/get_image",
       {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ filename: data.filename })
      }).then(response => {
        if (!response.ok) {
          throw new Error("Failed to get image");
        }
        return response.blob();
      }).then(blob => {
        const url = URL.createObjectURL(blob);
        this.generatedImageUrl = url;
      }).catch(error => {
        console.error(error);
        alert("Failed to get image");
      });
    }).catch(error => {
      console.error(error);
      alert('Failed to generate image');
    });

  }
}
