import markdown as md
def convertor(source,destination):
    try:
        with open(source,'r') as file:
            md_text=file.read()
        html_text=md.markdown(md_text)
        with open(destination,'w') as file:
            file.write(html_text)
    except:
        print("An erro occured")
convertor("markdown.md","html.html")

