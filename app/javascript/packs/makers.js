const makersList = [
  { value: "d61b9096-5dfb-4595-8b14-de726aed45c0", label: "79th Element" },
  { value: "f32af64c-544e-491d-99d0-c579264125b0", label: "8 Foot Rabbit" },
  { value: "75346085-1cb9-4b94-91bb-6eaaa2884319", label: "8AM" },
  { value: "e8fb4d49-cd9f-48d7-a4b4-f11ab8c3ed2c", label: "8Bit-Works" },
  { value: "945f39e1-8665-48aa-b305-67802b2692cb", label: "A Ginger's Suits" },
  { value: "78513d36-cc1b-44a7-8a88-0eeb088f4969", label: "Adorable Foxie" },
  { value: "33a7ac4c-fd0d-41f5-b4ed-8632082de0b2", label: "Akorn Studios" },
  { value: "968ddea7-65a7-4a1d-8a33-0437a4a60c34", label: "Al Bird" },
  { value: "c98b6d95-3b59-48db-a7e3-f4f696666a45", label: "Albrecht" },
  {
    value: "b6ab0e02-11ef-4086-83cb-84e5dde18591",
    label: "Alien Eyes Creations"
  },
  { value: "0a9d88c6-73cd-4919-a3e9-137ef5597896", label: "Alinchen Fursuits" },
  { value: "729cac05-fda3-4893-a6f2-3de15d5f91a9", label: "Alinco Costumes" },
  { value: "f7b0e012-3d19-49d7-a1b3-e1884f4eb4de", label: "Alpha Dogs" },
  { value: "df97427f-39f5-4381-b342-e187842bada5", label: "Alpha Suits" },
  { value: "4fa907aa-d261-41e4-a796-4787ec7566bb", label: "Amoryllis Studios" },
  { value: "eb8c2b2c-2902-4b76-a6a1-010661d713fa", label: "Andy Oagara" },
  { value: "7c3cc3ff-b756-4a3a-8710-b84a5e2f0cb0", label: "Angel Tigress" },
  { value: "af5b43ca-cfcf-40aa-a381-6dbb9bf59fcd", label: "AngelDragon5" },
  { value: "58db67ec-01cf-452d-a799-4f5881f83aa4", label: "AnnikaCat" },
  { value: "ae1630b6-5b06-4256-b791-29c5a3de3591", label: "Anthropaws" },
  { value: "2b9146e4-4ab3-4135-be76-5dd449f20b31", label: "Aoi Kitsune" },
  { value: "1e53a642-5a1a-4fc1-b8a7-42d3aa472b97", label: "Apoxon" },
  {
    value: "92358a77-2be9-472a-9e7a-7f47c28daa25",
    label: "Appalachian Fursuits"
  },
  {
    value: "e395f6fd-a22e-49d6-afc8-5766a5cc1ccf",
    label: "Apple Monster Studios"
  },
  { value: "075be442-36c5-4d04-838f-87948fca2e71", label: "Arend Studios" },
  { value: "10c51e23-1487-4f86-8457-50e204d5ed5e", label: "Arito" },
  { value: "c393fe45-ec8c-47c9-8eaa-51fe35e2a24b", label: "ARocco Suits" },
  {
    value: "7df90b17-b9cf-49a0-8a4f-8aaa9cc0581f",
    label: "Around the Fur Studios"
  },
  { value: "342a26fb-b2f6-4ebb-9bdb-5c13f314d960", label: "Artslave" },
  { value: "30d7e15b-5282-452a-a587-fb0e5e5049ab", label: "Arzhurenn" },
  { value: "861039ad-a920-4e9d-918b-b3b0ef8773b8", label: "Atalon Deer" },
  { value: "a99ca10e-314b-4ed5-a7a8-24b74c24f5ed", label: "AtmosFur" },
  { value: "6a7240dc-0f3e-4734-9a94-fe9afedf86e3", label: "Autumn Fallings" },
  { value: "c1db8ca4-8f9f-496b-8683-cf50b9a28280", label: "Av0salt" },
  { value: "7642ac92-a773-4078-98f9-ccb3643ca6df", label: "Avsun Mascots" },
  { value: "e59644f8-c135-4172-b370-512b9eed8bb8", label: "Azflip" },
  {
    value: "cec1c25d-6965-44fc-ad48-de0cc3d1bdd2",
    label: "Azure Coyote Studios"
  },
  { value: "889ee797-23b7-4050-8582-85822f6a7a64", label: "B3 Mascots" },
  { value: "26e81efc-fee5-4108-b377-604824ad8c61", label: "Bad Doge Suits" },
  { value: "22ff3e8d-bc4c-4572-b153-779b166d8d52", label: "Battitude Studios" },
  {
    value: "dd56a607-41f1-4a83-bf82-72fad61e7308",
    label: "Beast Makers Fursuits"
  },
  {
    value: "699e722d-9ee2-4388-a5b7-87f28752bd2a",
    label: "Beastcub Creations"
  },
  {
    value: "fc167fe5-d8cd-4420-9c55-97b1b72bc3d5",
    label: "Beetlecat Originals"
  },
  { value: "8d3b2501-b5af-467a-8def-6c63d4f863e4", label: "Benzene6" },
  { value: "d5d189b9-e9ac-4265-9ece-73e641a583c4", label: "Big Jaw Costumes" },
  {
    value: "6cc9e04a-6c6c-42d2-addf-4f42567fadfb",
    label: "Bio Pelt Productions"
  },
  {
    value: "cc81dcf7-3a46-426a-b60d-f758378ef042",
    label: "Bird King Creations"
  },
  { value: "0b12ce84-4f28-4f83-af19-9c17179a390b", label: "Black Back Studio" },
  {
    value: "8ef528de-0cb8-4b52-84ea-1591e3b269e7",
    label: "Black Lion Designs"
  },
  { value: "20de015a-face-4054-9ee5-3190929886b7", label: "Blix Fox Fursuits" },
  { value: "edfece2d-7de2-492a-b34e-2a532bb7e071", label: "Blue Canary" },
  { value: "fa07ec9e-b42a-4b0a-962f-00186fcf8aa0", label: "Blue Fox Fursuits" },
  {
    value: "5302fe07-d257-4540-aa74-1db4c7d4d1ed",
    label: "Blue Harbor Mascots"
  },
  {
    value: "5c9840cf-8c72-468e-85e9-5d63e69da6c9",
    label: "Blue or Bust Fursuits"
  },
  {
    value: "7d938659-9526-4b1a-9199-392c63d48228",
    label: "Blue Rabbit Studios"
  },
  { value: "ffbd768e-bee2-4a88-a124-a4a02e734ddd", label: "BNC Costumes" },
  { value: "2213fab9-1afa-4e3e-be80-088a5fb5fee8", label: "Bongo Queen" },
  { value: "ecccbd25-b031-4123-aacb-c4e03fec40d6", label: "Bouncy Bat Works" },
  { value: "cf66415a-252d-4f0a-82aa-3f5eb8f54f14", label: "Brek Wolf" },
  { value: "9fe9f4e5-a55e-4e3e-906e-01f0bd5a271c", label: "Buppa Spirit Wolf" },
  {
    value: "3644ef4e-e107-4605-b2f7-0d4d11139679",
    label: "Butterfly Back Fursuits"
  },
  { value: "03f20196-6437-4a72-a6b5-e62a3fbcbf5b", label: "By Bunny Fursuits" },
  { value: "716791b4-e8df-4305-928b-80cdf4e7de68", label: "ByCats4Cats" },
  { value: "d108f3e0-b173-45d7-9e37-c9840df737f4", label: "Cabbits Co." },
  {
    value: "7ac4e97b-fcb8-483b-baa9-22bb7397a9d6",
    label: "Calico Cougar Studios"
  },
  { value: "993f2886-5f61-4793-b3fc-3433c70b3cf6", label: "Calypsonight" },
  { value: "79783bb0-bfb1-4dfd-a978-e1ed2b28f25e", label: "Candi Fursuits" },
  {
    value: "3b347d9a-d670-4ae6-b447-fc9afe5c77b6",
    label: "Canine Hybrid Creations"
  },
  { value: "56f0c0cf-9f4f-47ce-a6a9-5fe6dc3bf05d", label: "Cant of Togs" },
  {
    value: "7a00e142-2076-4069-80e1-7c00cd446052",
    label: "Carmal Coffee Fursuits"
  },
  { value: "c27b84d0-fa92-4b3c-bd3a-2b1eea4abe46", label: "Carolina Critters" },
  { value: "825f492d-2609-4297-8046-4c77a0fdf04e", label: "Cassius Crafts" },
  { value: "b5143a65-10a4-4324-9649-f3f787a778f5", label: "Cat Tails Up" },
  { value: "f7ae0de6-0b40-4044-8f1e-dfd51566f9d4", label: "CCS Mascots" },
  { value: "280b7a88-09f0-4a43-aaec-5eafc440c57d", label: "Cenobear" },
  { value: "21e9901b-3d8e-44a3-b756-3aabce14d676", label: "CFStudios" },
  { value: "8fe803d5-2367-44dd-8390-9f01aef780a1", label: "Chairo" },
  {
    value: "be0ccc5f-b095-4c7f-a26d-c4af4ca0ae9b",
    label: "Char'S Creature Creations"
  },
  { value: "de2fe7e1-fcc6-43d9-b435-92c7a9b5e958", label: "Chibemo" },
  { value: "37619e87-c0ae-4c6f-a441-c827ced245f2", label: "Chibi Marrow" },
  { value: "5a8828f7-5f63-4f34-831c-ee21a8a0854a", label: "Chilifoo" },
  { value: "418eee2c-2dc1-4d17-a55a-3dc904201d95", label: "Chiyo Fursuiting" },
  { value: "9b630ffa-52a2-4712-bfc4-69b1b82a2e47", label: "Chunksta" },
  { value: "a7854b5c-afd8-4757-92a2-64310bfcba66", label: "Circle Bird Works" },
  {
    value: "7419839d-4836-4408-950f-34eb9f515668",
    label: "City Mutt Fursuits"
  },
  {
    value: "dae506e0-6435-4f18-942c-4d4324f07014",
    label: "Clawsome Creations"
  },
  {
    value: "faebc7c5-9aa2-475f-ac7b-609904dac200",
    label: "Clip Point Creations"
  },
  { value: "58c31474-c7f5-4db7-b989-aa555a5cfc85", label: "Clock Struck One" },
  {
    value: "70917d46-b993-4be5-94ea-a4d8c1e61e35",
    label: "Clockwork Creatures"
  },
  { value: "24c027ac-6821-43eb-887d-4a8a0bcd7b00", label: "Coby Fursuits" },
  { value: "399a038e-06c1-4ba8-a862-f85d39627ac7", label: "Coffee Costumes" },
  {
    value: "f6e2870e-70e3-46cf-817f-6ffafec9740d",
    label: "Coffee Kitty Studio"
  },
  { value: "87db5490-e6c6-4c7f-ae71-5f2f2bca51ef", label: "ConiFURous" },
  { value: "70e2ca90-c5a8-41b7-9917-bdd51d9eff89", label: "Coonec Creations" },
  { value: "068e041d-62e7-4476-bb87-04d3b841e6ae", label: "Cosplay Dawn" },
  { value: "4a036eb3-e5a4-4093-a6d0-792634d7865f", label: "Cowan Costumes" },
  { value: "80938f2f-6e84-4a90-aa94-46917bad3f60", label: "Crafty Critters" },
  { value: "e63aeef9-f57d-489b-aed9-848faf9bb3ef", label: "Crazi Corgi" },
  { value: "4c8033ea-1927-4df4-8eb5-cd6f04f638bb", label: "Creative Mochi" },
  { value: "071101fd-28b7-4115-8833-b8ac769159b3", label: "Creature Haven" },
  {
    value: "c8d2b193-72ac-405b-a1ab-da43f9856a63",
    label: "Crystal Cat Fursuits"
  },
  { value: "c42e5ecf-2cb7-48a8-b9ba-825128a27333", label: "Crystumes" },
  {
    value: "b5a60d65-e60e-460c-8dff-e1d2492647dd",
    label: "Curiosity Created the Cat"
  },
  { value: "c485ca6e-c21e-449f-9fe0-308d2f51f754", label: "Curious Creatures" },
  {
    value: "e9cd3bf1-2fd6-460b-a364-cb3a4ccc1cb6",
    label: "Curious Tabby Studios"
  },
  { value: "527164f0-95e3-4293-acfb-bfbb70682ba7", label: "Cursed Creations" },
  { value: "26305860-49ef-403e-8952-9e951606f301", label: "CuttleB0ne" },
  {
    value: "05f0237d-7576-48e8-a0f2-3909d53680c5",
    label: "Cwoodsdean Creations"
  },
  {
    value: "5dee6116-b7c7-4baf-a7c6-ec67979432a3",
    label: "Dalmy Do Dat Creations"
  },
  {
    value: "e58a44c2-d919-46e0-9845-c62daffff9e5",
    label: "Dandelion Fursuits"
  },
  { value: "35bfbf52-bb19-4b91-803b-eca75829bc02", label: "Dandylions LLC" },
  { value: "57b17196-4ec1-4c75-8700-dc59a223f61b", label: "Dark Creations" },
  { value: "e4026330-f7fa-40e1-a646-9fc7e812eeb7", label: "Dead Dogma" },
  { value: "58ed2c32-2742-422d-b579-bcd89350af5b", label: "Deathatsix" },
  {
    value: "1602e3aa-c731-4e63-a6b9-981053273e73",
    label: "Deer In A Hat Costumes"
  },
  { value: "0bc07d94-aa18-4116-a381-176dc998ad4b", label: "Deezlberries" },
  {
    value: "3bb1e650-c4ce-4469-a703-73a497fc81b8",
    label: "Delicious Disguises"
  },
  { value: "7fb4b586-efb7-4705-97c3-fda759003334", label: "Dexterous Zombie" },
  { value: "fed07dcc-a162-45e6-b1c9-bd8cf4df0b31", label: "Diadexxus" },
  { value: "1c4da22c-2127-484d-9ea5-398631d6a1ed", label: "Dingz" },
  { value: "bea87c7f-b1bc-4fee-95bb-0e5aa6690a47", label: "Dire Creatures" },
  { value: "18b31d22-0443-4a85-b4da-1c4019224f04", label: "Dolphyn" },
  { value: "b5b99c68-0ed3-4beb-a08a-1daa4d8855e2", label: "Dombrus" },
  { value: "27f5c040-92b4-4ab4-bdd8-b0fab7733e53", label: "Don't Hug Cacti" },
  { value: "4034ec72-3202-4dbb-b302-24089172bc27", label: "Dorky Dog Suits" },
  { value: "8d6b5e0f-5e47-4df3-ac3c-6a957e24ca21", label: "Dragon-X2" },
  {
    value: "f796704a-821e-46fe-a028-7e14fbf977f5",
    label: "Dragon's Grin Studios"
  },
  { value: "7d7de024-765b-4737-9ead-5c7b0dc3c1a2", label: "Dragoncid" },
  {
    value: "a13ddba6-ebd5-486f-a4aa-49b674e037ce",
    label: "Dragonfire Costumes"
  },
  { value: "a8fc04ba-ea68-4384-98d8-56be58ad3b26", label: "Dragonfoxdemon" },
  {
    value: "9a645a2b-1a1d-4527-b844-a31e959b2c37",
    label: "Drakon Twins' Fursuits"
  },
  { value: "a68f513c-b88b-4cce-b4f0-e1b31df34940", label: "Drakonic Knight" },
  {
    value: "71739f9d-b99b-4b44-9f10-34a38d6ec8e0",
    label: "Dream Machine Costumes"
  },
  {
    value: "7f6b5df4-94a1-4706-a8d9-bb3280542a6c",
    label: "Dream Vision Creations"
  },
  { value: "0b30d6d1-d77e-4011-9bb3-79ef874e0212", label: "Dresden Complex" },
  { value: "78da8c8e-6247-47ed-bec2-ddae076d8b36", label: "DTWA" },
  { value: "a8e20865-056d-445e-bc5f-251481bd2ad9", label: "Dubmutt" },
  {
    value: "c526796b-68ba-474b-a7af-7b87248b2a35",
    label: "Dynamic Cats Studio"
  },
  {
    value: "5fcbbd43-7213-4db4-955a-bad16ae1732b",
    label: "Elemental Fursuits"
  },
  {
    value: "1f19f4b4-7280-459f-9818-d6c1b58d9985",
    label: "Elk Craft Fursuits"
  },
  { value: "93ee8085-0ace-4d81-a439-7e1457b99050", label: "Kegawa Creation" },
  { value: "e149009d-c990-4474-bb16-56bb4657f8e7", label: "Ellies Fursuits" },
  { value: "8ebfd5a0-23a8-48de-8d24-63e426188c23", label: "EntryLevelFox" },
  { value: "de735444-2a27-4dad-b8ec-6d1fc2124182", label: "Errowolf" },
  { value: "85f87473-9c46-45c1-81d6-54b9e5ef9e8c", label: "Esuterure" },
  { value: "94c8a67e-b487-4860-8abf-380efb5c91ee", label: "Eternalskyy" },
  { value: "64a90081-1c09-421e-9b48-9869e78f60a1", label: "Euharmonics" },
  { value: "2d8549b4-d382-4fc6-ab5b-bbbad7e2e32d", label: "Evil Bear Fx" },
  { value: "5a547c99-9adc-4d68-8af1-b08a75530eda", label: "Evozarro" },
  {
    value: "ae17da9f-9ea1-4e5e-8264-4b46b1122c2e",
    label: "Excelsior the Lion"
  },
  { value: "ac2447c1-e34c-4e0d-bab0-8988a1f9d782", label: "Ezza" },
  { value: "ed8fc9e8-b23b-42e9-98ae-18ffa6263fc4", label: "Facemakers Inc" },
  { value: "cce05084-05c7-414d-88c0-a81c419f4f36", label: "Fallimar" },
  { value: "8483fd5f-96d1-4b52-b2d0-3de82c78b3fd", label: "Faris Batwan" },
  { value: "6e076939-d2b4-44bf-8942-40d1d4485ec8", label: "Faruku Costumes" },
  { value: "c984ae4a-0dac-4945-8c08-7574f822c180", label: "Fatazndog" },
  { value: "b6d0bef0-b75f-4b17-80d6-59ce317876c8", label: "Fatkraken" },
  { value: "662fbd74-1a92-4209-a613-8a42d92a8ba3", label: "Fauxpawroo" },
  {
    value: "5d3d8cdf-a179-4af7-b2c5-e7e633351ba4",
    label: "Featherbat Fursuits"
  },
  { value: "95bc48e3-e6db-4542-96ed-c7f6369e3a74", label: "Felixkatz" },
  { value: "cae64f75-6470-42e0-8abb-b271dff27e3d", label: "Fenné Crafts" },
  { value: "34da4854-99c0-494f-a932-cef5200e870a", label: "Fenrirs Child" },
  { value: "161b903b-8325-4870-93fb-245c6e5a7e5f", label: "Feral Facade" },
  { value: "1adbbfc4-9522-4943-9e1e-e6caec56c91a", label: "Finnish Fox" },
  { value: "85602720-43e9-467b-b7c4-bf43b83db577", label: "Firestorm Six" },
  {
    value: "3dcea6e2-271e-4ba6-ab4d-b3d88f129132",
    label: "Fish R Furiends Studios"
  },
  { value: "4dc8e6ef-7b29-49fe-94c1-b84a1d6640d0", label: "Fixit Fursuits" },
  { value: "70f0f84a-3e04-43b2-9d79-02987f9f50c6", label: "Fleeting Fennec" },
  { value: "d70c92cd-5446-4b28-ba92-81842b41873e", label: "Flix Dragoness" },
  { value: "e487aa22-f065-4df4-9140-a478305d42b0", label: "Flixsuits" },
  { value: "e3c5af0b-c377-45ae-aa04-96539daacae3", label: "Floof Unlimited" },
  {
    value: "8fb97a0c-9387-447b-9d8a-1389a15bd398",
    label: "Fluffenough Creations"
  },
  {
    value: "4ae11f5c-346d-4fac-b1df-7d48993fd256",
    label: "Fluffy Stuff Studio"
  },
  {
    value: "9f62540b-11fe-448e-be6b-d898488581f2",
    label: "Fluorescent Paw Works"
  },
  {
    value: "ccb4d361-7996-4e64-93a0-c1dec3e00e7b",
    label: "Forever Furry Creations"
  },
  { value: "be074815-186e-4b53-a532-1284e908890c", label: "Fossa Studio" },
  { value: "41797c5d-a95f-452c-9109-f57b4f90cadd", label: "Fox Convoy" },
  { value: "d4f34a24-7a51-40a1-81e3-7ccfed2bbe92", label: "Foxfairy" },
  { value: "9c02e513-246a-411b-a571-a1a47c4f4934", label: "Foxfeather" },
  { value: "ce913746-93cc-494d-a21b-ac3f6097ad9f", label: "Foxysox Studios" },
  {
    value: "3c924b0d-3b32-4a97-a286-6bef1753b2df",
    label: "Freakhound Studios"
  },
  { value: "5c3a23d0-6f97-4b14-b8e3-4812874c3070", label: "Freckled Designs" },
  {
    value: "87dc3189-aba5-47cd-add5-fca805a56aa2",
    label: "Freedom Spirit Creations"
  },
  { value: "e297cd7c-426b-4041-9ccf-f7a99f3dc9e0", label: "Freya Fox" },
  {
    value: "878841b1-879a-4af7-a933-60cfa345d61c",
    label: "Frostbite Fursuits"
  },
  {
    value: "1ad3c1cb-7113-46f3-a4fb-9ca04248d8b3",
    label: "Fruitsuit Creations"
  },
  { value: "83fde98d-35be-45cc-be1d-509eea35a3c1", label: "Full Moon Special" },
  { value: "8588fd1b-b674-449a-87e2-1b34af81667a", label: "Fun Fur All" },
  {
    value: "a1f6fe0c-60f9-47a2-a4e9-7f4429474801",
    label: "Fur Fancy Costumes"
  },
  { value: "baf590ed-c92b-4f75-ac61-fd46f1ed3555", label: "Fur It Up" },
  {
    value: "bb464288-86ab-4e3d-8c94-7435a21a06fd",
    label: "Fur The Win Studio"
  },
  { value: "0be9463e-d0a3-4781-a5dc-b72015f43615", label: "Furbrications" },
  { value: "5bee5597-e46a-4b03-934f-d7eac179d14f", label: "FurDelicious" },
  { value: "d33f193c-72e4-4a84-aaaf-7cc4c3f02dce", label: "Furducers" },
  { value: "23a210b3-2f39-4424-99ca-3b1e656e60b9", label: "Furensics Studios" },
  {
    value: "fc9aa9ec-6550-4d5b-af13-ff693d7be38d",
    label: "Furfect Pit Studio"
  },
  { value: "3c9a560f-ca7b-4da8-9bd2-5cd34d5842c1", label: "FurForge" },
  { value: "a77508e4-9c2a-430c-9cc8-63d11d6fdb71", label: "Furfrontier" },
  { value: "a1bdc844-b595-40ee-97ed-277760667b12", label: "Furgen Studios" },
  { value: "234d31ac-d8c1-4506-aa75-7501c2e5fd32", label: "Furhonor" },
  { value: "7706296b-5a68-4a5b-83f9-c88e1014abdc", label: "FurR Club" },
  { value: "312173f9-a285-491f-8035-21bfc5f77c79", label: "Furr Happens" },
  { value: "6ff9447a-00fe-447e-94e0-be12aa048b41", label: "Furred Fantasies" },
  {
    value: "a209925b-5597-40b6-b704-6a6880cce400",
    label: "Furred Out Kreations"
  },
  {
    value: "6f8dc939-bce9-4a75-8c0d-1fce0d0bd6f3",
    label: "Furry Crossing Creations"
  },
  { value: "b5789299-e2bd-4170-83a6-1dab3aa1e71b", label: "Furry Factory" },
  {
    value: "b41b7c16-9e78-4b76-87a0-3515fb79d543",
    label: "Furry Fursuit Maker"
  },
  { value: "b044ba0a-3b13-4d85-91dd-a43384b66215", label: "Furry Machine" },
  { value: "c4cc976b-b2f8-4a96-9ca6-e9cfdcf8585c", label: "Furry Squad" },
  { value: "d16be1dd-19b8-4e76-9e5f-0d32572a17fe", label: "Furry Studio" },
  { value: "6ef5d208-b991-41f8-9e85-e1c6e3d2e3bd", label: "Furry Tailor" },
  { value: "da931d66-4513-4bec-8a61-0f8f798ccc45", label: "Furry-K9" },
  { value: "3e01ce93-b00a-4b80-84e6-eb892c342d71", label: "Fursonalities" },
  { value: "b2c5c6f6-52f8-4eaa-99d7-c8ed1d7e7bc8", label: "Fursuit Creations" },
  {
    value: "209b2cbe-246d-4388-ab3d-f17201ffb9dd",
    label: "Fursuit Enterprise"
  },
  { value: "b09dd684-434b-49fd-a128-f6eb51d3a204", label: "Fursuit Funday" },
  { value: "8e13487b-cfac-476f-9f84-ccf0d68a3792", label: "Fursuit Parade" },
  { value: "9ca99b9a-bf88-46b2-a1ba-52d77886051c", label: "Fursuit Up" },
  { value: "a29dc7cb-3f96-4977-b0d9-ecb425e77bc8", label: "Fursuits by Lacy" },
  { value: "39ff00f5-0108-42be-9236-43f444534439", label: "Fursuits by Mars" },
  { value: "2349fc2d-55aa-4788-bda4-baa9c1f3a336", label: "Furtastic Studios" },
  { value: "f5ff3e5d-a68f-49b6-840c-5074b0426411", label: "Furtic Studio" },
  { value: "9cf5157d-b9f1-473a-b062-1df4abca601f", label: "FuruArts" },
  { value: "b6c7444b-846a-4e1c-b1ef-fe05712c2a7c", label: "FurZombie Studios" },
  {
    value: "ea308be3-97b3-4b51-8d47-fa6f70afbf8a",
    label: "Fuzz Butt Fursuits"
  },
  { value: "83014562-9762-42d9-bb05-05485d282932", label: "Fuzzworks" },
  {
    value: "9a3ea1c8-37fe-4e03-b659-eebbea8eb0b8",
    label: "Fuzzy Buns of Steel"
  },
  {
    value: "490114ba-05d4-4b5e-9eb3-0327b1ddd448",
    label: "Gaderian Wolf Fursuits"
  },
  { value: "9e358acf-75a2-4beb-8512-4c3f6b0cedfc", label: "Galesmilax" },
  {
    value: "ace45f40-21a5-4289-bea1-28d8fba4670f",
    label: "GEEKpaw Productions"
  },
  { value: "cf921cb8-1f3f-43b5-af88-93989c6bdfc5", label: "Gitz" },
  { value: "4757b037-cccd-4cdc-915c-a221cdfe8ef3", label: "Glow Sheep" },
  { value: "5a792502-27c4-4617-9e44-9c1f19350887", label: "Go Fur It" },
  {
    value: "83540760-821b-4971-b177-def319cf9012",
    label: "Gold Ribbon Studio"
  },
  { value: "04a39a82-07a0-420a-b2eb-87d8bb8d40c1", label: "Golden Maw" },
  {
    value: "c069e254-f0bf-42c7-ad72-5a058c11f70c",
    label: "Graveyard Stuffers Suits"
  },
  {
    value: "5648a5d4-29bd-4b87-a318-7d9b69d8c90b",
    label: "Grinning Tiger Disorder"
  },
  {
    value: "59db8f77-6e85-4146-8dc7-1cb09e0b39d3",
    label: "Gronway Commissions"
  },
  { value: "ddac06ac-9132-4ed8-acad-33abf87888ed", label: "Grotto Creations" },
  {
    value: "4ac6b5d5-266b-424e-85cd-dd19fea3e62e",
    label: "Grove City Fursuits"
  },
  {
    value: "6d391432-62d1-45c5-982d-aa30b25a67cd",
    label: "Guinns Custom Creatures"
  },
  { value: "e1f42f61-e36a-448e-a5cc-c7e3855a1ef4", label: "Hakumei House" },
  {
    value: "567b2531-927d-4442-9806-1a5264d6f488",
    label: "Happy Tails Costumes"
  },
  { value: "19cb1fc9-b57d-4dfa-b175-7fad0167fe7e", label: "Hawthorn" },
  { value: "2ea7e0e7-a5ca-4f65-8528-d83b8e2b30ea", label: "Head Over Tails" },
  { value: "441e4768-90dd-4d08-b5b6-0220af12d15b", label: "Hidden Arts" },
  { value: "560ca517-a8d8-4f35-92c8-54e8ac6d396a", label: "Hidden Treasury" },
  {
    value: "f4c336c5-77d4-4d67-8e05-d7549e12522b",
    label: "Hiero Craft Creations"
  },
  { value: "3cc07839-7883-4012-936e-c14ebf41908c", label: "HoneyspydeR" },
  { value: "ccd0e38a-23b1-40a2-8a0e-8e144f69d3e6", label: "HoofnHard" },
  { value: "4074077e-c4ff-4fa6-9eef-1b2218f776cc", label: "Hounds Teeth" },
  {
    value: "33943071-6c90-4c38-8713-0a8400424706",
    label: "Husky Moo Creations"
  },
  { value: "7f058a92-4806-4d1c-9511-de197c128eb9", label: "Hybrid Studios" },
  { value: "0b0f7c02-bc40-4423-aaf8-04a153fcc2e2", label: "Hyena Girl" },
  { value: "f44609a1-d949-4152-860f-b2db565c6bb0", label: "Hyena Hoy" },
  { value: "b383877c-420b-4b71-82cb-27235885ffee", label: "Hyokenseisou" },
  { value: "098c0c4b-a772-429a-bc62-131d49255c1a", label: "Ichi" },
  {
    value: "aaab64f9-e7ff-409f-a372-0bf737002430",
    label: "Icy Paw Productions"
  },
  { value: "619c7d45-b30d-4efb-8530-c3316b6a2f45", label: "Illimearu" },
  { value: "1e8ad633-52cf-45ae-9f93-bdba38c1f3e5", label: "Inerri Creatures" },
  { value: "83589799-3bbe-4f9d-b2b2-084175b9ea89", label: "Inkfire" },
  { value: "f18b1eb9-dd8f-4fd5-b800-bf7004320ea2", label: "Irinae" },
  { value: "9b65ecd7-5b20-4fb1-a285-0b79471ffb29", label: "Isabelapparel" },
  { value: "cdaf36c2-1416-4bd2-ad3b-408a8703bab1", label: "Isabella Price" },
  { value: "97b71010-e968-4e2a-805f-fde3b6c8750e", label: "Itallonova" },
  {
    value: "675f9824-4af2-4d07-bf43-9555af42df7f",
    label: "Jax the Purple Bat"
  },
  { value: "c53a5519-1c73-4b74-b869-e23291d28bb9", label: "Jello Vair" },
  { value: "3f977a98-b7a2-4ffa-9dfd-88c5b258eb69", label: "Jesse Frosst" },
  { value: "bddffa2c-9c4c-46e2-92cf-08d250ecdc4c", label: "Jill Costumes" },
  { value: "805cb55a-6d2a-41fe-8423-14ff9dfb5ee5", label: "JjreamBig" },
  { value: "25f12d67-d8cf-4775-a5f6-5de2771eff81", label: "Johara" },
  { value: "9e837242-fcec-4aac-a9c5-2ab8d8eeed16", label: "Jpupbob" },
  { value: "ba2b54e2-0bb4-4b0e-9d2c-5c9a66d15869", label: "Just Fur Kicks" },
  { value: "55704f0b-24ba-43c6-a427-815734430ebc", label: "Kaibab Costumes" },
  { value: "427b6446-e4d5-4c66-bc00-64284c4fda20", label: "Kaidas Kingdom" },
  { value: "0098eb1b-33e4-440d-8b7a-4f412201ae7b", label: "Kaijugal" },
  {
    value: "b95d2a6a-6988-4295-b3c7-bdfb6a299682",
    label: "Kandorin Creations"
  },
  { value: "4e701d37-2846-4e8e-9f51-dfb8ec3a1671", label: "Kangaroo Feathers" },
  { value: "abf6455d-1f87-4d13-8034-84788687834a", label: "Karthegrax" },
  { value: "4d8a84a2-3089-451f-bef0-576f43a480e9", label: "Kawaii Vixen" },
  { value: "9dcc2a1f-acef-4510-be2a-109b67691da0", label: "Kayla's Kritterz" },
  { value: "77d99f25-c075-498a-8407-69a2b825aaef", label: "Kazulgfox" },
  { value: "f15cc347-68fd-44d7-b42b-6fce0f134701", label: "KC Costumes" },
  { value: "d992371a-a21f-422f-b380-5ee8b2e3e40e", label: "Keeper of Dreams" },
  { value: "9b538023-9c96-4ef4-b076-d15cdf7b30bc", label: "Keiko Vixen" },
  { value: "1db17964-eece-4da3-8d75-b33bc1a81f1b", label: "Keira Blacktalon" },
  { value: "b662148f-e9ec-4c3c-993d-4fba8c18884b", label: "Keyoki" },
  { value: "ca51edd8-3706-4f1e-a55a-6d6311802a00", label: "Keyoto" },
  { value: "3a44d1bd-cf10-4a3e-984d-425a46f15e0d", label: "Kilcodo Costumes" },
  { value: "c11dd497-a279-45ec-bf11-8c6501b571d8", label: "Kimba Snowpaw" },
  { value: "90a6cd44-7cf4-44d7-b05e-adf345d423ac", label: "Kinred Fox" },
  { value: "cbec7a88-c563-46a1-928a-bbf2ca597dea", label: "Kisu" },
  { value: "71757b91-8257-4482-abec-91d298b54eaf", label: "Kitsune Illusions" },
  { value: "3cdef3b3-4277-40b8-b9ca-f0cee97cac62", label: "Kitsune Studios" },
  { value: "640ceaae-e9b3-4018-81df-dd56047d43ed", label: "Kitsunerawr" },
  { value: "2e1d022c-f29f-4633-a242-90345b2b2d6c", label: "Kitt Creations" },
  { value: "64a1f5aa-7f3a-48e5-a249-19e3ad970d72", label: "Kiwihunter" },
  {
    value: "bac69294-96ff-4bd3-9142-d9b8c8e89340",
    label: "Klickitat Matrices"
  },
  { value: "ccc8d36e-0ea9-4e3b-ba5e-22aab33da89d", label: "Kloofsuits" },
  { value: "dca596da-0564-4e50-a005-9018da8e454c", label: "Knossos" },
  { value: "a08277cd-6d47-4f18-89ac-b0447f33bfd2", label: "Kodi Fursuits" },
  {
    value: "9ec56c69-3b80-43ed-80b1-de9f31ca7040",
    label: "KomicKrazi Studios"
  },
  { value: "8f60fbbf-654d-4124-a308-d2c600a0ddd3", label: "Kurauno" },
  { value: "fe4f5019-e7f8-42c0-9496-d4cf15640913", label: "Kyanite Creations" },
  {
    value: "e19a85aa-6896-4c03-9abc-e37bc066d3bc",
    label: "Laela McPitty Suits"
  },
  { value: "88447ed9-aefb-436d-b54d-eb90977dbca6", label: "Laken Steeljaw" },
  { value: "ed554862-7951-410b-ba13-53999d81826a", label: "Lavafox" },
  { value: "d018805a-a033-4ee4-8a6f-8d335d09a190", label: "Lazy Lupe" },
  {
    value: "c9900bc2-5ac4-41fc-8a9f-e859f2095599",
    label: "Lemonbrat Fursuits"
  },
  { value: "11ed82f6-8c90-4cc6-a4d0-a856d01158e6", label: "Lenny Mutt" },
  { value: "35184897-e7f0-4e16-bf17-9953387b087d", label: "LeoneLaTwerk" },
  {
    value: "14e7bc60-ac11-4143-9971-69fddb5055b8",
    label: "Leopardcorgi Creatures"
  },
  { value: "a394a614-04a8-4e19-a738-2749855b8547", label: "Lhbeau" },
  { value: "a1a266a5-665b-4c91-8427-309aa002be18", label: "Ligercraft Suits" },
  { value: "1f43639d-7208-4b8b-8a97-a5f5f2e45773", label: "Lillie Likes Peas" },
  { value: "ca4cd0a5-b499-4d74-84d3-8df791fc32d6", label: "Lion of the Sun" },
  {
    value: "180beacd-5784-4087-8ec2-691dbd89037d",
    label: "Lizard Loves Mustache"
  },
  { value: "8594d9be-bf9d-47ee-9676-b49e8f452b0f", label: "Lizaruk" },
  { value: "a9c32492-723a-4f47-b0e2-06f17cb5044d", label: "LKR Mascots" },
  { value: "11c13286-6eef-47dd-bcc7-40152d189dc7", label: "Lobita Works" },
  { value: "1c0a5732-b019-47a3-9e6d-101775eeaa2c", label: "Locado" },
  {
    value: "b18823f6-a2b5-4ed4-b3db-416d482317c4",
    label: "Locomotion Fursuits"
  },
  { value: "bacecf4e-f783-4e36-a742-69f5b4a96244", label: "Lodi Dah Fursuits" },
  { value: "0f4f1006-6d3e-4b0e-99bd-7b30b609dc81", label: "Loris" },
  { value: "6881ff18-f86f-4bbe-9005-635243d79287", label: "Loui" },
  {
    value: "32138493-2165-4404-90e8-f9834e4405cd",
    label: "Lucky Dog Fursuits"
  },
  {
    value: "7b7dc991-8412-4ad4-b589-b2705db56207",
    label: "Lucky Gum Fursuits"
  },
  { value: "82ca25b9-e146-4409-9308-cba43e7512b6", label: "Lunar Forest" },
  { value: "a8421a54-b55a-4267-85d0-c7c62e72886b", label: "Luno Vulpes" },
  { value: "5df88867-fd08-4ed7-8977-ae817e1fd307", label: "Lupinemoonfeather" },
  {
    value: "81c4a66f-b6bc-4e7f-a237-b6b05476d28b",
    label: "Luskwood Creatures"
  },
  { value: "84b63724-0e3b-493c-9582-298a338fa7b1", label: "Made by Mercury" },
  { value: "ab45f272-8b26-4a43-a9f0-b0b5d4cdaa40", label: "Neex" },
  { value: "05afeec1-196b-4191-b86e-d16f9509bdd8", label: "Made by Muttmix" },
  { value: "02615644-1584-4a0b-a737-2f406a937522", label: "Made Fur You" },
  { value: "27e9b745-6b73-403b-8da1-0b93057bab75", label: "Made in Holland" },
  { value: "95bc70cb-bc18-4a3b-9ea6-3ca343d142e5", label: "Made4Hugging" },
  {
    value: "4d77899f-ba49-4ec8-86fa-3baf684faeea",
    label: "Magic Foxy Artworks"
  },
  { value: "c1c8ccc1-c706-4c6a-bcfe-c3fa541ee9d9", label: "Magnus Diridian" },
  { value: "1e912117-5c93-4cd1-8708-25b692a217ef", label: "MagpieBones" },
  {
    value: "21579bec-6cb2-4112-b62b-786c21c5fc98",
    label: "Mango Island Creations"
  },
  { value: "e19c93e0-6992-4085-8536-9a7080366b8a", label: "Mangusu" },
  { value: "65b89ec8-86d9-4ff0-b44a-51bf5101539b", label: "Marylen Costumes" },
  { value: "401daf56-9c3b-4ce8-b01d-1f951155b8a9", label: "Matrices" },
  {
    value: "ed2cf41f-8e84-46e5-842a-8fab387cc631",
    label: "Menagerie Workshop"
  },
  { value: "86bcef6e-ecc0-4410-bebe-80fe23b05f0d", label: "Mercifur" },
  { value: "a5de7e22-f792-47a9-a1ab-1e5c20d88117", label: "Messerschmitt" },
  { value: "4c25bfae-2fc7-43a4-a880-03205153ac4e", label: "Metaldog00781" },
  { value: "ccf28942-e4e6-4135-ab20-198f6e4151e4", label: "Micro Mascots" },
  { value: "ed4cb966-e05d-4ad6-8a4d-9d616bde479d", label: "Midnight Swimmers" },
  { value: "9559f51b-44e4-4333-b63d-7fb0765eb453", label: "Midowko Art" },
  { value: "ccafa387-7829-4a6d-9796-e770d29f03fa", label: "Mini Boss Mascots" },
  { value: "46a77a2d-0b56-4604-b21e-99f5fcb482ee", label: "Mini Wolf Arts" },
  { value: "1ff12166-a5b7-4940-a15c-4b59d92dcaeb", label: "Mirepoix" },
  { value: "58dd3bdd-f7e0-4120-9829-59212ef0b67f", label: "Mischief Makers" },
  { value: "bad9d5d4-4631-4dcc-ab70-191d855515a2", label: "Miss Wolfiee" },
  { value: "ea391e85-308e-4b1c-9c7e-b45d80f0c1a1", label: "Mitha" },
  { value: "06a30184-86d2-49cf-86b7-37bcf55053e0", label: "Mixed Candy" },
  {
    value: "3dfa9368-0f7f-490d-97e9-7d2dff92cfb4",
    label: "Monkaus Furry Bitz"
  },
  {
    value: "4e1d9149-0065-4224-b1f1-f1d6ee731c24",
    label: "Monster Cat Creations"
  },
  {
    value: "3ded0992-0084-489a-a07f-86bea934054c",
    label: "Monster Deer Creations"
  },
  { value: "881e591a-0617-4612-94dc-52ec23cad4e4", label: "Moon Devourer" },
  { value: "cf08c1c6-a41f-4c79-9bf8-1a185166477c", label: "Moon Mochi" },
  {
    value: "27370834-7bcd-4ddc-a513-8d8ee1e2cd1f",
    label: "Moonlightbatshadow"
  },
  { value: "a56bec74-e0f2-44ea-9848-3c270329e0de", label: "Moop" },
  {
    value: "d87ae44a-d413-40c6-a122-2e95df6eff49",
    label: "Mordrudes Monsters"
  },
  { value: "5bce9ac8-b6ad-4462-a7fb-2caa07edd64d", label: "More Fur Less" },
  {
    value: "fb91c612-aec4-4675-893d-2f6acf53b589",
    label: "Mostly Bad Costumes"
  },
  { value: "cad5fdbe-6e4b-4258-809b-8064f7fbc646", label: "Mothsicle Suits" },
  { value: "a63524a1-3308-4ac0-adb8-4dd7093bb46e", label: "Mugiwara Cosplay" },
  { value: "04733d39-1ef5-4997-8ad9-35fc2f006b3a", label: "Munchkin Bunny" },
  { value: "02f4dfd1-e79f-4dba-813d-24670487e154", label: "Muntjacked" },
  { value: "898448f9-625c-4952-bb47-2f4351fe0e04", label: "Mushi Crosshairs" },
  { value: "d9a4ed4c-963c-438e-a658-afac6b72e754", label: "My Fur Creations" },
  { value: "89df819a-7f2e-4968-9e76-3f12c9f40854", label: "Myrtle's Monsters" },
  { value: "413623ae-207c-4f30-98be-43fe9728cc93", label: "Mystic Creatures" },
  { value: "8109b9d5-319d-44fb-81c9-6a060cf8b51c", label: "Mystikreatures" },
  { value: "37551143-e8b0-40f5-8445-89297252795a", label: "Nafierye" },
  {
    value: "e3af0a7c-2901-44e1-9419-e3a60c1a4fe9",
    label: "Nagowteena Costumes"
  },
  { value: "f2f58d84-5d47-4a00-810e-0f603f47cf1b", label: "Natsuro Suits" },
  { value: "8a54a834-7b2b-490c-9085-68d9c060a654", label: "Nekofelin" },
  { value: "d9f68088-64ca-44aa-8ee4-2d4de5aff4c8", label: "Neon Fur Studios" },
  {
    value: "165bc720-e156-45dc-91fb-4c98f877d643",
    label: "Neon Puppy Creations"
  },
  { value: "1fae0564-6c9e-49b2-a55f-db039f2e6889", label: "Neonr0se" },
  { value: "26bfb217-274a-4833-b541-45e27841cc93", label: "Nether Den Studio" },
  { value: "9d22273a-fe06-4733-864c-8bac48dabbe8", label: "Nifeline" },
  { value: "635d8297-5654-4cc8-ab8d-52e5d4ff0692", label: "Nightfell" },
  { value: "e656b911-1832-4795-9e70-7ddbf97e214c", label: "Niiku" },
  { value: "fbce49d8-32b6-4a7e-951e-800467c7edb5", label: "Noble Productions" },
  { value: "858f3571-34ed-49ce-b329-2b6c0180fb4d", label: "Norsepaw Studio" },
  {
    value: "694ad23f-29ed-4f35-9e5b-ce29ec20c55d",
    label: "Norsewolf Creations"
  },
  { value: "492400a0-a616-4ad9-a833-2c4c54ef8a05", label: "Northfur FX" },
  {
    value: "0fe634e4-c88b-4eaf-9a3d-df8cdc79c70e",
    label: "Northshore Mascots"
  },
  {
    value: "b953e97c-f1b0-4ac3-bf9c-7f73d8682bed",
    label: "Nucler Fur Creations"
  },
  { value: "f2b2d79b-0406-4795-b0bb-46c4c6d7514b", label: "Nuke Creations" },
  { value: "9027716d-0bfa-4ce7-96e3-e69b5e9a6795", label: "Ocicat" },
  { value: "d695ad02-c496-478d-9287-3bfa00a72e06", label: "Og's Fursuits" },
  {
    value: "def1ac9e-a686-4edd-ac8a-ba1caf6e797a",
    label: "Ohmega Suit Studios"
  },
  { value: "0c6c256a-6a59-4442-b304-e18fb0bc885a", label: "Omega Paws" },
  { value: "64b6d3ad-60d5-4bf6-bedc-5cecbc374d96", label: "OMG Pineapples" },
  { value: "ca8d5eb0-66c3-463b-8129-c650f8476fac", label: "Onai Wolfwind" },
  { value: "7ea0266f-ec21-4a11-8c88-db7927b1f589", label: "One Eyed Doe" },
  { value: "082f7008-b6be-43e2-809c-58f544c3df83", label: "One Fur All" },
  {
    value: "21d43b3d-1c56-4d8d-afb0-8fe3f0bcf03f",
    label: "Onix Angel Creations"
  },
  { value: "d84f36bc-2b19-4754-9a56-672daa86c5f2", label: "Orwin" },
  { value: "6d6f0777-cd63-4a58-9cdb-719f94dfbdde", label: "Otter Nonsense" },
  { value: "1aa20d04-94da-4c85-a1c5-387cf8765cab", label: "Otter-n-Daughter" },
  { value: "c603ebab-0cd5-494a-81b7-c8e0bd202b00", label: "Our Mass Hysteria" },
  { value: "18cdb347-636d-4be3-83e0-b7ca447f61bd", label: "Oz Kangaroo" },
  { value: "69e3ae13-beff-49d3-97cd-48323d8ca0d5", label: "P Pardus" },
  { value: "fc9c4a3f-60f8-4729-a579-b78672eafaad", label: "Paciulo Fursuits" },
  { value: "982434fb-e210-469b-ad6e-4173b7071151", label: "Paddlefoot" },
  { value: "8ed6d1e7-57e8-4d3e-b87a-b1c8d787d729", label: "Palohmino" },
  { value: "8d545d04-8155-4007-afde-b1efd65ebd43", label: "Patchworkpibble" },
  { value: "f0ffd4cd-93af-4b12-b0ff-bae41acffd9b", label: "Pawie Paws" },
  { value: "4a0708c1-f3f3-4cd9-a47b-1ed09c0eee64", label: "Paws Productions" },
  { value: "426cd265-cf8b-4d28-ba42-ded22048e4f2", label: "Paws Fur Effect" },
  {
    value: "390f084e-8018-4eb9-9f69-4ec238900c74",
    label: "Pawthentic Creations"
  },
  { value: "0327bab0-f69d-489a-8db4-ba8c8fcd91c2", label: "Penpenfoli" },
  { value: "30049c05-8931-4e85-8d37-afda4debae65", label: "Phar" },
  { value: "8d7c707b-b823-4033-8dd0-4c3d67899857", label: "Phoenix Nest" },
  {
    value: "98f34e6a-ff02-4649-9db3-53bb6b4575f4",
    label: "Pink Gecko Productions"
  },
  {
    value: "0471b14e-9b85-48d6-9cc1-3df2dcfb1435",
    label: "Piranha Petting Zoo"
  },
  { value: "a448e40a-ddff-44aa-9818-cd34c7780d14", label: "Pocalypto Designs" },
  { value: "2cd12586-7ba7-401c-9134-9fe53d7d60ab", label: "Pokem" },
  { value: "a3cbf84e-9e0a-4b3c-899e-848af09b5a96", label: "Polarlight" },
  { value: "0161c253-e99b-4309-81fb-be6aa0477cb5", label: "Pouchhopper" },
  { value: "ba02b08c-4f4b-416e-98c1-67ace17f6e50", label: "Prefur" },
  { value: "ba346648-febe-4c1c-b6fa-76595d8b5a64", label: "Primal Art" },
  { value: "57b67832-b771-45e2-b2a8-5645aba6d7e2", label: "Primal Visions" },
  { value: "8b288391-5e1a-43f4-a88a-4253615f87a9", label: "Psybird" },
  { value: "897b1aaa-1a57-4584-bec9-5b93cdd4fbe9", label: "Pup1K" },
  { value: "accf3414-dd24-44cf-a710-4d7dc13cbab6", label: "Pyrope Costumes" },
  {
    value: "402c27a0-4881-4694-99cd-00886eaf0bbc",
    label: "Rabbit in the Moon"
  },
  { value: "8a75cbd7-4fd7-443a-be76-f834c6e9260e", label: "Rachel Loal" },
  { value: "7d5b1e86-7927-40f1-995a-06700b1cd3b8", label: "Radioactimals" },
  { value: "c88992c1-a452-40f2-b2ea-f32b31c03d9d", label: "Raditz Wyvern" },
  {
    value: "b7f72bb6-7eff-468c-8ffe-4e9dc482a5b8",
    label: "Rainbow Productions"
  },
  {
    value: "6a9ddade-aad4-4bed-9198-7e43a4810172",
    label: "Rainbow Wolfie Creations"
  },
  { value: "67a30b2a-0f22-4259-b1f5-74657cef201c", label: "Rainbowbeatz" },
  { value: "bdf908da-56d5-4b03-a98e-30eae999706a", label: "Ranshiin" },
  { value: "bb891ea1-4cd8-45d0-9645-9f2101b79063", label: "Rastafarian Lion" },
  { value: "7dd31496-6b35-4190-82b6-81f1b9d45bfa", label: "Ravell" },
  { value: "dcaf5f4b-6909-4f01-83c9-8a485b8704ca", label: "Ravyn" },
  { value: "b63fd840-7dd3-4c3b-b89b-f97b74fc080c", label: "Razzy Lee" },
  { value: "1a6a8f13-f7a3-4820-b3a2-dbb3f396fa8c", label: "Reason for Pawz" },
  { value: "ed564773-2c9b-4521-b476-c51d71eaf3d3", label: "Red Hyena" },
  { value: "c9bbf643-e0f8-4712-8ce5-91c33b5637fb", label: "Red XIX" },
  { value: "b7218a50-93b7-4796-8a96-d904e7e7aff3", label: "Redstorm Fursuits" },
  {
    value: "75bfe5e2-e9b9-49dd-9011-fa3e1bc4f844",
    label: "Regal Wolf Studios"
  },
  {
    value: "a5a6ede5-f137-4ee3-9284-0df1aad6a267",
    label: "Resurrecting Creatures"
  },
  {
    value: "8f73192d-e2a9-4cde-aa83-c38ca5c4e5ab",
    label: "Reveille D'Giovanetti"
  },
  { value: "5755e9d6-bba4-4eca-8dca-99e6ddbbc34a", label: "Rex" },
  { value: "aa5b1dcf-979b-4eed-9047-e4009b199a59", label: "Rhee" },
  { value: "f56d6d43-5632-45ee-b70c-3e913172885b", label: "Rhys Ookami" },
  { value: "df967159-c13f-4cda-9468-c1b3de0f6350", label: "Ritz Costumes" },
  { value: "4db51abd-96ef-46e5-af67-2fdbc69ea163", label: "Roofur" },
  { value: "037adc2e-048b-4b26-b337-1d6ef2097341", label: "RooSuits" },
  { value: "90f082be-8a0f-450a-9661-921363daa6f6", label: "Rosequoll" },
  { value: "7080ae7e-dbe5-455c-a2d2-0be565732302", label: "Rowdy Monster" },
  {
    value: "edfebe96-fbf0-4c9b-97c6-8a42d7b8ea79",
    label: "Ruff Stuff Costumes"
  },
  { value: "8b124f32-17c6-4155-9cb0-4d6da52b35c0", label: "Ruffled Designs" },
  { value: "0d7e7064-017b-4ff0-8533-c155dbaba4b9", label: "Rum Wolf Studios" },
  {
    value: "4ee1056c-d574-4c4e-84c2-fb1f8eb14ba6",
    label: "Running Wolf Productions"
  },
  { value: "c1c24a02-7b9b-41eb-8754-209a5fa961d4", label: "Runoratsu" },
  { value: "149e00ee-f2f5-4c71-8346-9e8bc9a7ef64", label: "Rust Rat" },
  { value: "332b9255-f052-47b4-b7bd-0eba91647431", label: "Ryoken" },
  { value: "ef5e2270-312c-4de6-9453-947c7394ea54", label: "Sabrinageek" },
  { value: "2604f7a9-96da-47e9-8224-56ef00b61c33", label: "Saigo Zangetzu" },
  { value: "cd49a0a7-43ab-4580-9efc-46df7258fb04", label: "Salty Suits" },
  { value: "21afd329-4819-4239-9dfe-1ac30a418cc7", label: "Salvo Sniper" },
  {
    value: "1e9ef081-8a1f-4482-a67e-fef7e9c612cc",
    label: "Sammy Smiles Works"
  },
  { value: "13dc6c1b-ef00-4dd4-a216-e2bdf3bb1e25", label: "Sanctuary Suits" },
  { value: "ed55f513-4334-43fb-9ec6-ca4fcc0828ee", label: "Sarahcat" },
  { value: "f57737c0-80e7-4177-8155-d706bf720748", label: "Sashaligress" },
  {
    value: "f1796804-dfe2-4204-8d86-253373e67b8b",
    label: "Sassy Pup Creations"
  },
  {
    value: "b62597fa-1245-4518-8200-3979ec3169db",
    label: "Savage Turtle Studios"
  },
  { value: "809ad902-4410-4067-8505-5f745e263c76", label: "Scardykat85" },
  {
    value: "96639575-4f23-4d02-aba1-8b090ef3e745",
    label: "Schneepardi Creations"
  },
  { value: "515d3462-f51b-4f74-b44e-69c74bcfe101", label: "Scratch Kitty" },
  {
    value: "9b1332e4-e3bd-4e68-af7b-55b086e9ce56",
    label: "Scuddle Butt Creatures"
  },
  { value: "cf3ffca4-5655-4789-bee3-d4ddca12031f", label: "Seadog Suits" },
  { value: "5cf7ead5-eb38-4512-8f17-60718af8fcc8", label: "Sewing-Critters" },
  { value: "4d8d7113-8afd-4ce5-833f-0f7ccd8ac113", label: "Seylyn" },
  {
    value: "fd5079e7-d95e-4fe3-b95f-fee71fee2f25",
    label: "Shaggy Griffon Studios"
  },
  { value: "ee1a7752-4c5e-4f5f-b92c-9c7a138a0b25", label: "Shagpoke Studios" },
  { value: "40ccb723-a20f-4c7d-b02e-fe04755af6c9", label: "Sharpe Costumes" },
  { value: "51603ade-8cc7-4758-90a2-b51ec710ac7d", label: "Sheevee" },
  { value: "7ebf223c-9ed8-4736-b44a-9fea7ad680fa", label: "Shengoh" },
  { value: "6c2b01f6-dad6-4e32-9587-a7b036bffb02", label: "Shkaff" },
  {
    value: "74595d92-5017-48c5-ae1b-66d95143f9bc",
    label: "Shock Collar Studios"
  },
  {
    value: "b92e9d1f-e88e-4689-b910-395dd8946b3d",
    label: "Short Stack Studios"
  },
  { value: "af5a0132-d94b-471f-86ea-008a8a001136", label: "Showreel Studios" },
  { value: "f35bcaaf-2e0b-4549-a0fb-5b15a995c33e", label: "Shuntorizzy" },
  { value: "2157b0e1-cfbd-4f0e-be4e-9938bfdeaeef", label: "Silent Howl" },
  { value: "2e87cbb5-25de-4218-abf2-5d46ca2fe894", label: "Silver Sky Studio" },
  {
    value: "5b8c2001-d459-4a5b-9eaf-23ea197982d4",
    label: "Sironafur Creations"
  },
  { value: "2f617800-0a04-49a0-89ac-5da696f3ca0d", label: "Skookum" },
  { value: "0b41ff3f-1639-4a1c-a1cc-65971f46da17", label: "Skyehigh Studios" },
  { value: "28e27f02-6472-4f1d-9d5a-d0979cd0f13f", label: "Skypro Costumes" },
  { value: "6c746f03-9ff4-4729-b9e9-2c19ab66c7db", label: "Slap Happy Bunny" },
  {
    value: "b9b657a9-ec95-480d-ac74-efb492e9995d",
    label: "Snow Gryphon Suits"
  },
  {
    value: "198a7fc6-7de3-4888-80d1-9646f6ce8f76",
    label: "Snow Leopard Creations"
  },
  { value: "91a0d472-d86d-4ae9-80b7-c4e2e97f3138", label: "Snow Volkolak" },
  { value: "0f3189cc-9b3d-4627-8bca-6d348b796bd1", label: "Soapdish" },
  { value: "9a94ffd0-5e6c-4514-a5f3-db19487457ae", label: "Solemn Vulpine" },
  { value: "20c68aa1-a890-479c-be30-6135314bda84", label: "Sonartoo" },
  {
    value: "5bfca91f-3d22-4b0b-9c91-65fa613c949c",
    label: "Soul Bound Fursuits"
  },
  { value: "ee04ca47-0b4b-44e8-bff9-5ec82219e9bb", label: "Soul Creations" },
  {
    value: "14dab4b2-6800-46de-a694-f40126a9e05f",
    label: "Space Cat Creations"
  },
  { value: "3500c321-18a0-4239-b7b4-291250b5a2ba", label: "SPark Costuming" },
  { value: "30b9037d-de95-4521-9b24-d235c745c374", label: "Spark Studios" },
  { value: "fe3495e8-2170-4373-96ca-1f6e1f72a839", label: "Sparkle Kreations" },
  {
    value: "5368bdb5-4d91-4fce-a148-8fcbfa5a7a1d",
    label: "Sparklepup Studios"
  },
  { value: "6e92724b-08c2-4311-9f6f-3682c7c607bc", label: "SparkyCanDo" },
  { value: "a43c7110-d101-46db-8abb-88dc42f4be43", label: "Sparkyena" },
  {
    value: "4b232cab-4e1c-4299-8c3f-f5e5a9f8ef60",
    label: "Speckled Blue Nose"
  },
  { value: "ea8e3836-b73c-4160-9fde-698ddff97e0e", label: "Spinfox" },
  {
    value: "df16c560-055c-4b73-b8f2-67546b05e5a0",
    label: "SpiritPanda Creature Cosplay and Costumes"
  },
  {
    value: "a3508ffe-c7d0-4be9-9cdd-6bf5013e871c",
    label: "Spit and Ink Studios"
  },
  {
    value: "c257e3df-8802-4ee3-91f3-5ed291f8cbfe",
    label: "Splinter Fox Productions"
  },
  {
    value: "e3af2032-b779-4771-93b6-cdc9cfd76a44",
    label: "Spotty Productions"
  },
  { value: "bf0bf735-b7e6-492a-89fa-52c9b0fefd51", label: "Squeaky Chewtoy" },
  {
    value: "3ef18065-ca25-4b32-be3f-4931d0062f8d",
    label: "Star Candy Creations"
  },
  { value: "de207a6a-b417-4d72-a9c4-10be31bad7e6", label: "Starparty" },
  { value: "f6278122-1db4-4ed3-acd0-4d1c07c43d76", label: "Starry Kitsune" },
  { value: "1b121817-0bcd-4616-8e11-1e3bb4894c15", label: "Starslikeroses" },
  { value: "4b6c9744-188e-45a2-a9e7-b74887767519", label: "Steel the Wolf" },
  { value: "4584e580-0f4c-4174-9577-939eb7db5129", label: "Stickypawz Studio" },
  {
    value: "466323fb-cb3c-4e22-bf85-84945e5e304d",
    label: "Stitch Star Fursuits"
  },
  { value: "d6c5eef8-c64d-41d1-abfa-53288f9d3ef1", label: "Stone Studios" },
  {
    value: "bf2e9532-7fab-472d-a276-aed7d8654cc1",
    label: "Storm Wolf Creations"
  },
  {
    value: "58068cb6-0e8c-4287-b1f7-d9d7ff8265e6",
    label: "Streifenschnauzer Fursuits"
  },
  { value: "1883b3a4-c27b-4b71-a9a7-0bd456ccfeeb", label: "Studio Delights" },
  { value: "7062be9e-f271-416a-ae59-009b3039fcbf", label: "Studio Neko" },
  { value: "999dbc00-bd94-4332-9928-0be06aa752a3", label: "Studio Pinali" },
  {
    value: "f92c5a5a-cdd5-4f0b-a286-b4b3a7224882",
    label: "Stuffed Panda Studios"
  },
  { value: "09aa0fdd-fde4-4488-8b32-d21743f8233d", label: "SueCreations" },
  {
    value: "2b547a1c-bf43-4a2f-9f27-22d934d09eb1",
    label: "Sugar Critter Studios"
  },
  {
    value: "c8e1340f-6124-4c66-acd1-5d67c593583d",
    label: "SugarNSpiceCostumes"
  },
  {
    value: "3fe5d94a-51be-47fd-bcc2-b85c5cbbefef",
    label: "Sugarrush Creations"
  },
  { value: "a3828a6c-1cad-49de-92ef-fa1ed15c00f6", label: "Suit-a-dile" },
  { value: "3f1289a1-50af-412e-84eb-89e871ddcb33", label: "Suits by Shark" },
  {
    value: "113fb859-37b8-4067-893a-9224e603cb5b",
    label: "Sun & Moon Creations"
  },
  {
    value: "d6176b76-19a2-45e8-ab12-3e79e2468948",
    label: "Sunny Valley Creations"
  },
  { value: "52783e28-05fa-4ca2-a58b-1684008890ae", label: "Surf Cat Costumes" },
  { value: "f9dc2dea-46f0-4b5b-bca0-b0de676d0f8f", label: "Sushi Suits" },
  { value: "f49de2c4-006e-4e5d-99b0-72231a49ab0f", label: "Sushimon Suits" },
  { value: "0a10a252-c116-43e0-858c-bce7349dc9f9", label: "Sushinom Suits" },
  {
    value: "f68dbf0d-26c8-4096-912b-bc119c8df6aa",
    label: "Sweentastic Productions"
  },
  { value: "676f7cc8-6221-4271-af4b-37cd3beb1594", label: "SweetSushi" },
  { value: "f11e5a45-d468-486f-9cf8-35970a9989eb", label: "Syber Wuff" },
  { value: "e059f3c0-9ef5-4dd7-9325-4159567777ff", label: "Sylfur" },
  { value: "c120c3a0-8c5d-41a3-a0ea-3b191f4f96ff", label: "Synthwolf" },
  { value: "64384e45-44c4-475c-a898-9e7b5297e2d8", label: "Tabulambestias" },
  { value: "cd9ae77f-5c64-4884-b8f1-1360f6b700cf", label: "Taffka" },
  { value: "cbf17d12-ec82-425d-b3ac-d55ac856d76b", label: "Tailin" },
  { value: "c47dd443-3b8f-4e38-8250-c00824d69a20", label: "Takumori" },
  { value: "61d7d646-4a26-46de-9c83-f7f2660cc06a", label: "Talarus" },
  { value: "fe07916f-c7ba-411e-9de8-8e06854c751a", label: "Tanidareal" },
  { value: "39ec523e-72f2-4db6-a282-7ca6dfff8c7e", label: "Tapapat Creations" },
  { value: "6a69b722-d5ef-4c58-9fa6-79de5bd1dd4f", label: "Tapapat Creations" },
  {
    value: "b76e49db-4f68-4960-b470-c670f3b2ad00",
    label: "Technicolour Costumes"
  },
  { value: "38ddb821-263d-4a82-9068-b1dfe3938b82", label: "Temperance" },
  { value: "f0f73880-d7eb-4f39-b5f5-992500e1d623", label: "Templa Creations" },
  { value: "9b7a5e39-0ae8-4909-948e-e626c7ec6338", label: "That's Furred Up" },
  {
    value: "32cab9fd-61cc-4d66-9b83-3985b8ae00f2",
    label: "The Corrupted Furries"
  },
  {
    value: "16a6f64f-b42c-406d-8e1f-2bd5274c0fc9",
    label: "The Critter Factory"
  },
  { value: "dae8828b-5bd4-4e0f-a193-25d97ddd803e", label: "The Curry Mouse" },
  {
    value: "7e0d848e-bc5e-4299-a9d4-8be8d2dbd53a",
    label: "The Frozen Phoenix"
  },
  {
    value: "6a235ee5-8e57-4b6f-9bc7-2f12c846730a",
    label: "The Fur Collective"
  },
  { value: "a7a125ec-00fe-4593-b568-3ff456109eee", label: "The Fuzz Factory" },
  {
    value: "2b156961-4f41-4460-9187-5c1f0fdad326",
    label: "The Grotto Creations"
  },
  {
    value: "c9086695-c5de-45a7-97af-4fcc8aed9f84",
    label: "The Karelia Fursuits"
  },
  {
    value: "39c9caa3-e3d0-4635-8281-0b944491aced",
    label: "The Menagerie Costumes"
  },
  {
    value: "77bfa666-254d-4e99-9bde-dedb2034887c",
    label: "The Other Side of Us"
  },
  { value: "debdd106-dc22-4934-8c27-3ff175376b98", label: "The Phoenix Nest" },
  { value: "b1b7aba0-f965-4d80-997c-b2eae2b1b346", label: "The Sable Kitty" },
  {
    value: "99ef9620-6637-4eeb-a3fc-b684cb89f0e1",
    label: "The Woodland Tailor"
  },
  { value: "87437863-0468-48ba-8a3f-a7a2352605d4", label: "Thirteen Diamonds" },
  { value: "dd8d6586-f982-4396-9db8-9d81866f682f", label: "Thrash" },
  { value: "2d4ce391-60fa-49b7-91a7-8180d170b040", label: "Thursday2U" },
  { value: "0470cdcb-b28c-4b9a-8be1-2220fac254d7", label: "Tiggy Workz" },
  { value: "d1011a0d-c664-4fed-afb7-1d55c488bbfd", label: "Tiny1Badger" },
  { value: "1390e6cd-0968-497a-861d-6782db6aabe1", label: "Tioh" },
  { value: "952bcc01-caee-498f-804d-4690eff82aa6", label: "Toasted Biscuits" },
  { value: "924c7ca3-5ee0-4a4f-ba78-9f0866640a8e", label: "Toffeee" },
  { value: "bc3f1f70-4f86-4595-960f-87e8c9e6c156", label: "Toxic Fursuits" },
  { value: "deff29a4-cf86-43d9-b918-63890dabb238", label: "Tribal Works" },
  { value: "1c9ba53e-0239-414c-9f96-c1fe9d21473a", label: "Tsebresos" },
  { value: "df15ee49-bc09-4923-b618-177e0cb7f724", label: "TunnySaysIDK" },
  { value: "0f3a58cd-3632-43af-a3ac-6a1e356ca0e7", label: "TV_Thari" },
  { value: "f217509e-361d-437d-84b0-8a1d4a728df4", label: "Twinky Arts" },
  {
    value: "3853f09c-f7b7-4700-89ed-7d3a82cc6a9f",
    label: "Two Faced Creations"
  },
  { value: "6734672c-35d5-4003-8d4f-d5121acd209d", label: "Two Wet Noses" },
  { value: "8cb87490-a86e-4c5d-99c6-0f525e4ce68b", label: "Uchihafox" },
  { value: "ae098d9a-6305-43b6-b830-ec94042091b1", label: "Ugly Puppy" },
  {
    value: "77773209-98ca-4dd5-92db-403e499334f1",
    label: "Ugolek Fursuit Studio"
  },
  { value: "e4e6ebe2-699a-46a3-a854-913feede2451", label: "Uren Husky" },
  { value: "415f021d-a264-4347-86a3-dbd4ccc161e8", label: "Valdyr" },
  { value: "48a25330-383f-466d-bbb6-b536007d203f", label: "Velkss" },
  { value: "556ecfd4-c09d-4191-ab42-5a77219e6aeb", label: "Velveteen Soldier" },
  { value: "fdef2446-9926-49f5-9c6b-6d6f45d5282b", label: "Wanderlust Suits" },
  { value: "8aaf71f7-6284-4853-8429-96e0d6141b8e", label: "Water Dog Wharf" },
  { value: "70997130-d335-4813-a91c-0c4fbc358b3f", label: "We Might Bite" },
  { value: "9b79f04a-dedc-454c-a65e-33ad4c6617d7", label: "Weasel Crafts" },
  { value: "7b499e8d-38bc-4cbc-814a-6cb2cca12ba2", label: "West Wind Howling" },
  { value: "a1e4380e-fcb8-4d4d-a08e-92c355a82944", label: "Whaleosaur Suits" },
  { value: "8d1d3dc3-1db4-40a4-be2b-35c20523b612", label: "What The Fluff" },
  { value: "1f0fc80b-6289-4d0d-86cf-5ef079c0b3a7", label: "What's Up Hot Dog" },
  {
    value: "b56b7d28-4e16-44f8-ba30-018ab83b0c61",
    label: "White Wolf Creations"
  },
  { value: "15977261-4bcb-45b1-8222-3b64065bae1b", label: "Wild Fuzz Studios" },
  { value: "1a572a02-66fe-402f-a39c-01fd17cab959", label: "Wildlife" },
  { value: "9c932ec0-1303-447e-9a10-4c08b1d29ecc", label: "Wildspotworks" },
  { value: "27547e63-5bd5-473a-a9d3-de1381adecb6", label: "Wildvskings" },
  { value: "3eaec0dc-d1a5-4b4e-b2ef-a9027d38883c", label: "Wildwolf" },
  { value: "9915073b-1c3e-44fe-99ed-f5d7aba85285", label: "Winfox" },
  {
    value: "71f27826-9e29-485a-8a71-9e2e5640ae2c",
    label: "Wingwolf Creations"
  },
  { value: "8328defd-5493-4a44-9e49-c8620d66fd33", label: "WMW66 Costumes" },
  { value: "6fec882e-4fe1-4a42-b984-92ccf62028b9", label: "Wolfbird" },
  { value: "516acb66-a43d-497b-ab5a-1217c4f2e58e", label: "Wolfskin Suiting" },
  { value: "cc561b94-7e96-4078-a4cd-6fc18bb9c94d", label: "Wolfwood72" },
  { value: "7ff38bc7-fba0-4b62-84d2-c2a518abc531", label: "Woltirr" },
  { value: "6ee6ad49-2e67-4089-916e-f1de6655641a", label: "Woozles-Wonders" },
  { value: "3de05a25-a38b-4edb-8c26-de9cce201772", label: "WorldConColor" },
  { value: "90ed79ae-a8a5-4496-8239-2e5249c08250", label: "Xaria Wolf" },
  {
    value: "8c23c56c-c5bc-4954-a628-0825591c1d5a",
    label: "Ya Boy Luke Fursuits"
  },
  {
    value: "c4fff550-d11f-420f-a634-4cc6a95359ef",
    label: "Yette Helin Studio"
  },
  { value: "409d6acd-4554-43d4-b573-d453f0882ad1", label: "Yoshinomi" },
  { value: "dbb7816b-b724-4f42-9809-bee36798f8bf", label: "Yu Puffin" },
  { value: "b434936e-14b9-4001-bf31-e7245de85ae4", label: "Zagone Studios" },
  { value: "7483f7fc-ce68-4534-844f-32d6a43a01d1", label: "Zee-The-Dingo" },
  { value: "96787d90-9502-4dab-acc4-62dde9e6af17", label: "ZombieHorse" },
  { value: "6c12a19b-11d4-446b-b078-594225e47ab7", label: "ZooAbsurd" },
  { value: "5770fafc-642c-4ab8-9e34-cbd0629d8744", label: "Zuri Studios" },
  { value: "5b065ffe-a2d9-4ea7-a129-cdacb88eae78", label: "Zurya Creations" },
  { value: "8ae6a2c8-be9f-401c-8b3f-f293d7cbb2ee", label: "Zuzufur" }
];

export { makersList };
