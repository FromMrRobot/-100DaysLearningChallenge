# import markdown as md
# def convertor(source,destination):
#     try:
#         with open(source,'r') as file:
#             md_text=file.read()
#         html_text=md.markdown(md_text)
#         with open(destination,'w') as file:
#             file.write(html_text)
#     except:
#         print("An erro occured")
# convertor("markdown.md","html.html")

import os
import markdown as md

def convertor(source: str, destination: str) -> None:
    if not os.path.exists(source):
        print(f"❌ Source file nahi mila: {source}")
        return

    if not source.lower().endswith(".md"):
        print("⚠️ Source .md nahi lag raha")

    try:
        # file read karna
        with open(source, 'r', encoding='utf-8') as file:
            md_text = file.read()

        # md → html
        html_text = md.markdown(md_text)

        # html likhna
        with open(destination, 'w', encoding='utf-8') as file:
            file.write(html_text)

        print(f"✅ Convert ho gaya: '{source}' → '{destination}'")

    except PermissionError:
        print("❌ Permission error")
    except UnicodeDecodeError:
        print("❌ Encoding issue")
    except Exception as e:
        print(f"❌ Unexpected error: {e}")

# run
convertor("markdown.md", "html.html")
