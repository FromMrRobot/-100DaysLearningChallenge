def city_Name(start_with):
    start_with = start_with.lower()
    try:
        with open("cities.txt", "r") as r_file, open("entry.txt", "a") as w_file:
            for line in r_file:
                if line.strip().lower().startswith(start_with):
                    w_file.write(line)
    except FileNotFoundError:
        print("Error: cities.txt not found.")
    except Exception as e:
        print(f"An error occurred: {e}")

def print_file(file_name):
    try:
        with open(file_name, "r") as file:
            for line in file:
                print(line.strip())
    except FileNotFoundError:
        print(f"Error: {file_name} not found.")
    except Exception as e:
        print(f"An error occurred: {e}")

letter = input("Write letter to append city start with: ")
city_Name(letter)

print("\nCities.txt contents:")
print_file("cities.txt")

print("\nEntry.txt contents:")
print_file("entry.txt")
