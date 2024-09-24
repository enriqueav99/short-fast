from moviepy.editor import *

clipImportante = VideoFileClip("MielPops.mp4")
clipRampa = VideoFileClip("Rampitas.mp4")

clipRampa = clipRampa.without_audio()

clipImportante_Vertical = clipImportante.resize(width=clipRampa.w)

clipMezclado = clips_array([[clipImportante_Vertical],[clipRampa]])

clipMezclado.write_videofile("clip_final.mp4", codec="libx264")
