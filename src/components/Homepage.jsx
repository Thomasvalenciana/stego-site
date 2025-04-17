import React, { useEffect, useState } from 'react';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const HomePage = () => {
  const [publicFiles, setPublicFiles] = useState([]);
  const [user, setUser] = useState(null);
  const [carrierFile, setCarrierFile] = useState(null);
  const [messageFile, setMessageFile] = useState(null);
  const [downloadUrl, setDownloadUrl] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(currentUser => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_BASE}/list-uploads`)
      .then(res => setPublicFiles(res.data))
      .catch(console.error);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!carrierFile || !messageFile) {
      alert('Both carrier and message files are required.');
      return;
    }

    const formData = new FormData();
    formData.append("carrier", carrierFile);
    formData.append("message", messageFile);
    formData.append("start", 0);
    formData.append("length", 5);
    formData.append("mode", "basic");

    try {
      const res = await axios.post(`${import.meta.env.VITE_API_BASE}/submit`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const fullStegoUrl = `${import.meta.env.VITE_API_BASE}${res.data.file}`;
      setDownloadUrl(fullStegoUrl);
      alert("Upload successful!");

      // Refresh public uploads
      const uploadList = await axios.get(`${import.meta.env.VITE_API_BASE}/list-uploads`);
      setPublicFiles(uploadList.data);

    } catch (err) {
      console.error("Upload failed:", err);
      alert("Upload failed: " + err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-100 to-emerald-200 py-10 px-4">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-2xl p-8">
        <h1 className="text-3xl font-bold text-emerald-800 mb-6 text-center">View Uploads</h1>

        {publicFiles.length > 0 && (
          <div className="mt-6">
            <h2 className="text-lg font-semibold mb-3 text-emerald-700">Uploaded Files</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {publicFiles.map((file, idx) => {
                const fileUrl = `${import.meta.env.VITE_API_BASE}/uploads/${file}`;
                const isImage = file.match(/\.(jpg|jpeg|png|gif)$/i);
                const isVideo = file.match(/\.(mp4|mov|webm)$/i);

                return (
                  <div key={idx} className="p-4 bg-slate-50 rounded-xl shadow-sm text-center hover:shadow-md transition">
                    <p className="font-medium text-sm mb-2 truncate">{file}</p>
                    {isImage ? (
                      <img src={fileUrl} alt={file} className="mx-auto h-32 w-32 object-cover rounded border" />
                    ) : isVideo ? (
                      <video src={fileUrl} controls className="mx-auto h-32 w-32 rounded border">
                        <source src={fileUrl} />
                      </video>
                    ) : null}
                    <a
                      href={fileUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-emerald-600 underline text-sm mt-2 inline-block"
                    >
                      Download File
                    </a>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {user ? (
          <div className="bg-emerald-50 p-6 rounded-xl mt-10 shadow-inner">
            <h2 className="text-xl font-semibold text-emerald-800 mb-4">Submit Your Data</h2>
            <form onSubmit={handleSubmit}>
              <label className="block font-medium mb-1">Carrier File (P):</label>
              <input
                type="file"
                className="w-full p-2 mb-4 border border-gray-300 rounded"
                accept="*/*"
                onChange={(e) => setCarrierFile(e.target.files[0])}
              />

              <label className="block font-medium mb-1">Hidden Message File (M):</label>
              <label className="bg-emerald-400 text-white px-4 py-2 rounded cursor-pointer inline-block mb-4 hover:bg-emerald-500">
                Choose File
                <input
                  type="file"
                  className="hidden"
                  accept="*/*"
                  onChange={(e) => setMessageFile(e.target.files[0])}
                />
              </label>

              <div className="pt-2">
                <button
                  type="submit"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded shadow transition duration-200"
                >
                  Submit
                </button>
              </div>
            </form>

            {downloadUrl && (
              <div className="mt-6 bg-white p-4 rounded-xl shadow text-center">
                <h3 className="text-lg font-semibold text-emerald-800 mb-2">Stego File Ready 🎉</h3>

                {downloadUrl.match(/\.(jpg|jpeg|png|gif)$/i) ? (
                  <img src={downloadUrl} alt="Stego file" className="mx-auto h-40 object-cover rounded border" />
                ) : downloadUrl.match(/\.(mp4|mov|webm)$/i) ? (
                  <video
                    src={downloadUrl}
                    controls
                    muted
                    className="mx-auto h-40 rounded border"
                  >
                    <source src={downloadUrl} />
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <p className="text-sm text-gray-600 mb-2">
                    Preview unavailable for this file type. You can still download it below.
                  </p>
                )}

                <a
                  href={downloadUrl}
                  download
                  className="mt-3 inline-block bg-emerald-600 text-white px-4 py-2 rounded hover:bg-emerald-700"
                >
                  Download Stego File
                </a>
              </div>
            )}
          </div>
        ) : (
          <p className="">Please log in to submit files.</p>
        )}
      </div>
    </div>
  );
};

export default HomePage;
