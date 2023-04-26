@app
better-brain-blogging

@aws
region ap-southeast-2
timeout 60              
memory 256

@http
/*
  method any
  src server

@static

@tables
user
  pk *String

password
  pk *String # userId

note
  pk *String  # userId
  sk **String # noteId