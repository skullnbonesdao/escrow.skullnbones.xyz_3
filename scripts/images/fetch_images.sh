#!/usr/bin/bash


outputDir="./out"
downloadDir="$outputDir/download"
imagesDirJPG="$outputDir/images/jpg"
imagesDirWEBP="$outputDir/images/webp"



mkdir "$outputDir"
mkdir "$downloadDir"
mkdir "$imagesDirJPG"
mkdir "$imagesDirWEBP"


echo "=== Fetching API ==="
DATA=$(curl "https://galaxy.staratlas.com/nfts")
IMAGES=($(echo "$DATA" | jq -r ".[] | .image"))
IMAGES_NAME=($(echo "$DATA" | jq -r ".[] | .mint"))

for i in "${!IMAGES[@]}"; do
   echo "> Downloading: ${IMAGES[$i]}"
   curl -s "${IMAGES[$i]}" -o "$downloadDir/${IMAGES_NAME[$i]}".jpg &
done

# Wait for all background tasks to complete
wait


echo "=== Downsampling+Converting images ==="
for img in "$downloadDir"/*.{jpg,jpeg,png}; do
    if [ -f "$img" ]; then
        filename=$(basename "$img")

        output_file_jpg="$imagesDirJPG/$filename"
        echo "Downsampling $img to $output_file_jpg by $percentage%"
        convert "$img" -resize 50 "$output_file_jpg"

        output_file_webp="$imagesDirWEBP/${filename%.*}.webp"
        echo "Converting $img to $output_file_webp by $percentage%"
        cwebp "$output_file_jpg" -o $output_file_webp
    fi
done

#echo "=== Downloading images ==="
#for i in "${!IMAGES[@]}"; do
# echo "> Downloading: ${IMAGES[$i]}"
# curl "${IMAGES[$i]}" -o "$output_dir/jpg/${IMAGES_NAME[$i]}".jpg
# echo "> Converting: $output_dir/jpg/${IMAGES_NAME[$i]}.jpg to .webp"
# convert "$output_dir/jpg/${IMAGES_NAME[$i]}".jpg -resize 100 -quality 5 "$output_dir/jpg/low/${IMAGES_NAME[$i]}".jpg
# convert "$output_dir/jpg/${IMAGES_NAME[$i]}".jpg -quality 5 "$output_dir/jpg/${IMAGES_NAME[$i]}".jpg
# convert "$output_dir/jpg/${IMAGES_NAME[$i]}".jpg "$output_dir/webp/${IMAGES_NAME[$i]}".webp
#done


echo "=== DONE! ==="
