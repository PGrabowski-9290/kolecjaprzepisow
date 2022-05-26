const przepisy = [{
  "id":1,
  "author_name": "John",
  "user": "uuid",
  "dish_type": "obiad",
  "difficulty":"hard",
  "time":"60",
  "photo":"url or path here",
  "ingredients": [
    {
      "name": "marchew",
      "amount":2,
      "unit": "kg"},
      {
        "name": "sól",
        "amount":2,
        "unit": "g"},
  ],
  "recipe": "Przepis treść przepis treść przepis treść<br> treść przepis treść przepis przepis przepis przepis przepisu"
}]

const comments = [
  {
    "autor": "jan",
    "timestamp": "12312312312",
    "content": "Komentarz",
    "idRecipe":"1",
  }
]

const users = [
  {
    "uuid": "1231",
    "name": "marchewkowy",
    "mail":"mail@marchew",
    "hash_pass": "ashedpassword",
    "role": "moderator"
  }
] 