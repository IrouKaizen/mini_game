import speedtest

st = speedtest.Speedtest()

download_speed = st.download()
upload_speed = st.upload()

print(f"Vitesse de téléchargement : {download_speed / 10**6} Mbps")
print(f"Vitesse de téléchargement : {upload_speed / 10**6} Mbps")
