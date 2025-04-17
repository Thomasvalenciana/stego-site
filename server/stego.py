import os

def embed_message(carrier_file, message_file, output_file):
    with open(carrier_file, 'rb') as f:
        carrier_data = f.read()

    with open(message_file, 'rb') as f:
        message_data = f.read()

    # Get file extension (e.g., .mov, .pdf, .txt)
    _, ext = os.path.splitext(message_file)
    ext_bytes = ext.encode('utf-8')  # e.g., b'.mov'

    delimiter = b'==STEGO_END=='
    # Format: carrier + delimiter + extension + delimiter + message
    combined = carrier_data + delimiter + ext_bytes + delimiter + message_data

    with open(output_file, 'wb') as f:
        f.write(combined)
    
    print(f"Embedded message: '{message_file}' (.{ext}) into  Steganography'{output_file}'")


def extract_message(stego_file, output_base='recovered'):
    with open(stego_file, 'rb') as f:
        data = f.read()

    delimiter = b'==STEGO_END=='
    parts = data.split(delimiter)

    if len(parts) < 3:
        print(" No embedded message found.")
        return

    ext = parts[1].decode('utf-8')  # Get extension
    message_data = parts[2]

    output_file = f"{output_base}{ext}"

    with open(output_file, 'wb') as f:
        f.write(message_data)

    print(f"✅ Hidden file extracted to '{output_file}'")


if __name__ == "__main__":
    import sys

    args = sys.argv
    if len(args) < 3:
        print("❌ Usage:")
        print("👉 Embed:   python stego.py embed carrier_file message_file output_file")
        print("👉 Extract: python stego.py extract stego_file [output_file_base]")
        sys.exit(1)

    mode = args[1]

    if mode == "embed" and len(args) == 5:
        embed_message(args[2], args[3], args[4])

    elif mode == "extract" and len(args) >= 3:
        stego_file = args[2]
        output_base = args[3] if len(args) > 3 else "recovered"
        extract_message(stego_file, output_base)

    else:
        print("❌ Invalid command.")
