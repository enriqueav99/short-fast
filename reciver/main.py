from fastapi import FastAPI
import uvicorn

app = FastAPI()

@app.get("/")
def read_root():
    return "Hola mundo!"

@app.get("/carpeta")
def read_root():
    archivos_mp4 = []
    for archivo in os.listdir(doomy):
        if archivo.endswith('.mp4'):
            archivos_mp4.append(archivo)

    if archivos_mp4:
        print("Archivos .mp4 encontrados:")
        for nombre in archivos_mp4:
            print(nombre)
    else:
        print("No se encontraron archivos .mp4 en la carpeta.")

if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000, reload=True)
