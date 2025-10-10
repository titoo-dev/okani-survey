import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Get the blob URL from environment variable or use the default one
    const blobUrl =
      process.env.APK_BLOB_URL ||
      "https://p6drwb1bb4kiiymp.public.blob.vercel-storage.com/okany-survey.apk";

    // Redirect to the blob URL for download
    // The blob URL is already public and can be used directly
    return NextResponse.redirect(blobUrl);
  } catch (error) {
    console.error("Error downloading APK:", error);
    return NextResponse.json(
      { error: "Failed to download APK" },
      { status: 500 }
    );
  }
}

