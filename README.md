# Video Conversion Tool

This tool converts MOV files to MP4 format using Python.

## Setup Instructions

1. **Install Python dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

2. **Run the conversion script:**
   ```bash
   python convert_video.py
   ```

## What it does

- Converts `video.MOV` to `video.mp4`
- Uses high-quality H.264 video codec
- Uses AAC audio codec
- Automatically handles file existence checks
- Provides progress feedback

## Requirements

- Python 3.6 or higher
- moviepy library
- FFmpeg (automatically installed with moviepy)

## After conversion

Once the conversion is complete, your `video.html` file will work correctly with the new `video.mp4` file.
