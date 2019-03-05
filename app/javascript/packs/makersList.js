const makersList = [
  { value: "9297c6b4-0431-4de3-9f5f-6282c3578b0b", label: "1Pup Suits" },
  { value: "9337efc8-ca15-4d66-b6ca-b7e63048b127", label: "2 Stupid Furs" },
  { value: "ccbb1801-9fb5-40de-af89-e258cf744cca", label: "79th Element" },
  { value: "6d2a9f8e-5089-4f82-af35-6f889cd2629e", label: "8 Foot Rabbit" },
  { value: "e8059896-b896-47d9-b5f4-71c022b2e25c", label: "8AM" },
  { value: "9dea54fb-eeb8-416e-80fb-a0f61d92d524", label: "8Bit-Works" },
  { value: "e5675443-cecf-4895-a9c8-e3e850f7a662", label: "A Ginger's Suits" },
  { value: "cafd0196-da61-4b18-9209-585ac7eb5684", label: "Admirals Costumes" },
  { value: "f1686f05-7beb-4e07-880b-8ca0ad8d87b2", label: "Adorable Foxie" },
  { value: "c93e8d52-0dbf-420b-81f4-349994614490", label: "Aheun Fursuit" },
  { value: "1cc51ae2-7257-4acd-9759-6f7d3494ad79", label: "Ajax Suitengu" },
  { value: "262e3bc6-4639-4902-bff1-b0b1f1018118", label: "Akorn Studios" },
  { value: "0a0936f1-b38e-4b7a-a761-730c97c64d7c", label: "Al Bird" },
  { value: "3c11bfbb-7c30-4f8b-bf05-d7f0ccbc1ab6", label: "Albrecht" },
  {
    value: "bf58bb3e-418c-4652-85eb-c7eee2f6b556",
    label: "Alien Eyes Creations"
  },
  { value: "7ae75390-d4b7-4e8b-88a2-12f9bb1f0a84", label: "Alinchen Fursuits" },
  { value: "34a42159-fcf4-4d9c-87a4-4b10eaec6a76", label: "Alinco Costumes" },
  { value: "57bd2a16-7c03-46ea-a1e3-15c18faedd93", label: "Alpha Dogs" },
  { value: "c6e97046-0886-44e9-8cd9-e68895d8c125", label: "Alpha Suits" },
  { value: "bb3a7882-7a30-4b1f-8162-a5e187c2882e", label: "Amber Groves" },
  { value: "4fa30b8c-c2a6-40f6-8dae-552633e6dc73", label: "Amoryllis Studios" },
  { value: "9b88e420-399f-45d8-919c-6be760f15652", label: "Andy Oagara" },
  { value: "b7661d74-97e2-44b5-8626-5936382895ad", label: "Angel Tigress" },
  { value: "e2fa4c66-b16b-4f5e-ae5b-0a300ed36515", label: "AngelDragon5" },
  { value: "2c859258-1d4a-4444-bf03-904b794f762f", label: "Angry Red Fox" },
  { value: "89df0ba5-2730-4da5-aa62-33a3f007e349", label: "AnnikaCat" },
  { value: "677dab55-0b24-4ca2-8b59-08a8b3b8a795", label: "Anthropaws" },
  { value: "e5d383b9-cdda-4bd9-ae4d-adfcf8dea5d9", label: "Aoi Kitsune" },
  { value: "4e79c8d2-42f4-4ad3-bd43-4c37f41a2b74", label: "Apoxon" },
  {
    value: "4dc747da-fee4-4aa9-9763-aee8269f13f8",
    label: "Appalachian Fursuits"
  },
  {
    value: "400c1e5d-4eb6-4a09-9610-59fad103c8cd",
    label: "Apple Monster Studios"
  },
  { value: "831dc6e6-be8e-48d1-8d93-ea415efd40b8", label: "Aqua Frost" },
  { value: "178ac703-8c18-4baa-b9b5-556353994438", label: "Arend Studios" },
  { value: "45633a11-00e2-44b4-b019-ccd83da9ce7a", label: "Arito" },
  { value: "c6d782e1-cfdd-4697-80bd-d677ed8149d4", label: "ARocco Suits" },
  {
    value: "1b814d92-b4a8-4603-bc08-decfa8e6fc11",
    label: "Around the Fur Studios"
  },
  { value: "3617f6ff-0c47-4153-a481-3a500a8aceab", label: "Artemis Bobcat" },
  { value: "d9112e9d-db12-452c-a16c-d5441e48bb1b", label: "ArtKour" },
  { value: "79320709-797b-4b8e-bb61-0b7d8eb9b8f7", label: "Artslave" },
  { value: "b7170662-2d56-4507-8e62-6257a262a45c", label: "Arzhurenn" },
  { value: "0e33262a-b818-4211-97ab-cd67fb412347", label: "Astro Antlers" },
  { value: "c3460f29-3dcb-4fc0-913c-8a0705777330", label: "Atalon Deer" },
  { value: "330b9fd6-e091-4ba5-8bc3-67b21dc74864", label: "AtmosFur" },
  { value: "402fbcff-ef23-4e2c-9ca7-88619dc3c32c", label: "Autumn Fallings" },
  { value: "c7cf1770-f112-4ef5-b856-5f1b694e0321", label: "Av0salt" },
  { value: "5d3920c6-1870-46f1-a904-0d8abae86d9c", label: "Avsun Mascots" },
  { value: "fc7f0d1e-6aff-4f2e-b083-b0d8a1ea45a7", label: "Azflip" },
  {
    value: "faeab3c5-3f9f-4de2-a665-4826ec425c72",
    label: "Azure Coyote Studios"
  },
  { value: "cfec84ee-cb92-4b74-b7b4-eb93e65e584b", label: "B3 Mascots" },
  { value: "edd5e9ae-c35c-4a87-aef2-4b9f4a483363", label: "Bad Doge Suits" },
  {
    value: "af8ec64a-19d3-410f-bef6-fa1c17902bbf",
    label: "Barking Mad! Suits"
  },
  { value: "cb858659-d4cb-4ff4-86b8-d5b5b43bed12", label: "Bat Cat Suits" },
  { value: "b5fa51f8-fe42-42aa-ba63-6b143498a0d8", label: "Battitude Studios" },
  {
    value: "4033463f-81d2-4f54-9009-4b91240aee8a",
    label: "Beast Makers Fursuits"
  },
  {
    value: "299984e8-c746-46ae-b1b4-f46a201a7f12",
    label: "Beastcub Creations"
  },
  {
    value: "b1d1e2f0-5465-4cae-95c7-d0ae4610d6cc",
    label: "Beauty of the Bass"
  },
  {
    value: "5198246d-993d-4837-af75-aacaeef8f895",
    label: "Beetlecat Originals"
  },
  { value: "72aeb346-045f-4ad2-aaa8-6a321c4fdd01", label: "Benzene6" },
  { value: "88fb4f4d-ac84-4dac-884b-d690d54d39d7", label: "Beta Raptor" },
  { value: "6036733c-9875-42e7-b152-01458a984b8b", label: "Big Jaw Costumes" },
  {
    value: "d3077a82-3eff-430c-8d50-5c5ac9348c9c",
    label: "Bio Pelt Productions"
  },
  {
    value: "13ab423d-82de-4468-850e-c0da38fb8fa5",
    label: "Bird King Creations"
  },
  { value: "c6ce3834-7c93-463e-9e4a-20389b41c305", label: "Birty Creations" },
  { value: "7a5df3e7-679a-444f-a445-329f0b42302c", label: "Black Back Studio" },
  {
    value: "83c79d8b-60b5-47e8-b350-32b6929a23d1",
    label: "Black Lion Designs"
  },
  { value: "88ab0d2f-5c8c-4560-b54c-1675569a0a96", label: "Blix Fox Fursuits" },
  { value: "4fc5c21e-0b7b-452f-a42c-e9ed7c99d118", label: "Blue Canary" },
  { value: "7817f9ee-96b3-4929-b718-e36ab8545fc2", label: "Blue Fox Fursuits" },
  {
    value: "4e917476-dfe3-4c29-8b0f-813545ce766d",
    label: "Blue Harbor Mascots"
  },
  {
    value: "586a866a-a8d4-46c0-8189-a2aa399b4764",
    label: "Blue or Bust Fursuits"
  },
  {
    value: "535b9c7e-9513-441d-8325-882aa6e20f44",
    label: "Blue Rabbit Studios"
  },
  { value: "b04064b2-eb06-4550-8b02-5f5a9375ef68", label: "BNC Costumes" },
  { value: "27b49832-d4d8-4653-a998-2f27642d2c09", label: "Bongo Queen" },
  { value: "51728ca0-4c2d-4414-9fde-b54d269c496b", label: "Bouncy Bat Works" },
  { value: "8103b8e1-a4b0-4a4e-9024-74e71d23ddbb", label: "Brek Wolf" },
  {
    value: "342d8be9-395f-42ae-87ab-c1560ba87221",
    label: "Brush Wolf Studios"
  },
  {
    value: "4767440e-8f8b-402d-947d-2ecbe941da8d",
    label: "Builder Bear Studios"
  },
  { value: "31d49af4-7fa8-4200-9fa0-4fc7dd19f3af", label: "Buppa Spirit Wolf" },
  {
    value: "e8dd55ae-98b4-4b17-af52-538333dc49ec",
    label: "Butterfly Back Fursuits"
  },
  { value: "e04619c6-1a07-42b5-adda-8765353273d1", label: "By Bunny Fursuits" },
  { value: "a83f031a-eff1-4ada-b9fa-51daa3e3e945", label: "ByCats4Cats" },
  { value: "b7c7a6f7-0b43-4d11-a4f3-ee9139b1e728", label: "Cabbits Co." },
  {
    value: "9ae2aa2a-5c1a-44a1-a722-050e2ab01c2b",
    label: "Calico Cougar Studios"
  },
  { value: "35cdaffa-57c6-4797-bd1a-1b3705d94702", label: "Calypsonight" },
  { value: "950931c4-922a-4804-87db-c143de85e9cd", label: "Candi Fursuits" },
  { value: "3067ae7f-22b0-4e28-a577-df0bab9462b8", label: "Candyxdog" },
  {
    value: "2121c46b-f51a-4598-acaf-cd6333b748ed",
    label: "Canine Hybrid Creations"
  },
  { value: "2ff11acc-301c-4483-8da3-f39a2dc87595", label: "Cant of Togs" },
  {
    value: "31369aa1-7fd4-40d0-9144-7efd620f5958",
    label: "Carmal Coffee Fursuits"
  },
  { value: "937699ac-f59b-4b14-9282-4ba45dc1e6c8", label: "Carolina Critters" },
  { value: "6b9c32cb-c693-4149-a0f8-a3ab588d79db", label: "Cassius Crafts" },
  { value: "2b790e15-9090-4698-b83f-c1cca8247dcf", label: "Cat and Cockatoo" },
  { value: "3e31fe11-f374-46be-8ab9-ecd268f847df", label: "Cat Tails Up" },
  { value: "c786f65f-80cc-4141-b69d-62b872097b1b", label: "Cawstumes" },
  { value: "828ddc85-b61e-4747-bb2d-2c190ab021f2", label: "CCS Mascots" },
  { value: "37bc4851-08b6-4f5b-b0c5-445117af9ce9", label: "Cenobear" },
  { value: "36e04aa8-5d31-48f3-808a-e5e0785c39c7", label: "CFStudios" },
  { value: "86bc14eb-1328-4523-9e1e-30b65721d6ca", label: "Chairo" },
  {
    value: "9ff971d2-d655-4e3f-919d-cf28ac6a2223",
    label: "Constellation Creations"
  },
  { value: "f7fd3f48-d6db-47fc-92bb-9938f19b3407", label: "Chibemo" },
  { value: "cffa89fc-7b97-4800-ba32-77629ce8d0a3", label: "Chibi Marrow" },
  { value: "dbc4cedd-ebcd-4f3a-884b-a7d654e16e6a", label: "Chilifoo" },
  { value: "cdae575e-bcc6-4244-960e-6c1549745779", label: "Chiyo Fursuiting" },
  { value: "cdfe6eac-4b50-4bbf-b023-685c8111ea39", label: "Chunksta" },
  {
    value: "ce105c92-044f-49b2-b491-5aea5ab5e044",
    label: "Cinnamon Rabbit Creations"
  },
  { value: "d20dfd9e-a471-467c-94f7-ac4118448b40", label: "Circle Bird Works" },
  {
    value: "6a7635a7-c137-4790-94d8-0b484a01aac6",
    label: "City Mutt Fursuits"
  },
  {
    value: "9a3ad0f6-7b65-4cf8-a0a8-0ade2b6318ac",
    label: "Clawsome Creations"
  },
  {
    value: "9c5410c1-84ac-4c33-92a2-e718811fe602",
    label: "Clip Point Creations"
  },
  { value: "f365f37c-04f5-49b0-927c-302878119d4d", label: "Clock Struck One" },
  {
    value: "f3b7a9b2-840b-4426-b779-30a93e371062",
    label: "Clockwork Carousel"
  },
  {
    value: "8fd31fc4-09c3-43a4-a51d-a7681a7d339c",
    label: "Clockwork Creatures"
  },
  { value: "c8eb6139-b65c-4d77-9c51-164d4ee1903e", label: "Coby Fursuits" },
  { value: "eec08b11-6a51-4bd9-bde9-324e4d82025a", label: "Coffee Costumes" },
  {
    value: "bb2071d5-339f-4c80-9082-218ddc07ec98",
    label: "Coffee Kitty Studio"
  },
  {
    value: "f497a512-0a6f-4b59-a02b-1d8936af80c8",
    label: "Colorful Creatures"
  },
  { value: "5d57e369-24df-481c-b883-067c0e0d7b2e", label: "ConiFURous" },
  { value: "1576dac1-9c31-4795-9e2d-de31e95f2ab3", label: "Coonec Creations" },
  { value: "11104918-a63d-4d6e-b703-adf7a1b6edb3", label: "Cosplay Dawn" },
  { value: "6f8f2f37-8840-4139-86ed-0f26f22276b7", label: "Cowan Costumes" },
  {
    value: "3765247d-0216-481d-aba4-1d9a0767970a",
    label: "Crafty Coyo Costumes"
  },
  { value: "f5794e65-e30c-401a-a3c1-8da38c14c1b9", label: "Crafty Critters" },
  { value: "de97ae8c-00a1-4cd5-a856-3e7fcdfb2c33", label: "Crafty Husky" },
  { value: "03d6216b-6ff7-4800-be06-4cfabf05c55f", label: "Craftypillar" },
  { value: "da270fa4-e332-46db-b4f7-6ed1fea3a476", label: "Crazi Corgi" },
  {
    value: "20359d41-6041-4774-818d-9c9ff14b2251",
    label: "Creation by LadyNightlight"
  },
  { value: "ffdfb361-9cec-4ea0-9cc4-4b2706fdda13", label: "Creative Mochi" },
  { value: "26e934d5-31f3-4de3-a787-0f896b0b5793", label: "Creature Haven" },
  { value: "02ccce3a-c45c-49a9-9e2c-f4bbf49b8c62", label: "Creatury" },
  { value: "2edb1024-14bb-4b1f-8856-4d11c74d8514", label: "Cross the Fur" },
  {
    value: "443237f6-f118-46ec-a191-3007d8c387da",
    label: "Crystal Cat Fursuits"
  },
  { value: "4b3bd09b-eaac-4f25-8d54-e95b06592cca", label: "Crystumes" },
  {
    value: "d0620e87-a6bc-41ef-a519-97228f43c1e9",
    label: "Curiosity Created the Cat"
  },
  { value: "12b58565-3351-4029-a94f-667cad85d147", label: "Curious Creatures" },
  {
    value: "317c99e7-80fb-4508-b2c4-5bb771957c9d",
    label: "Curious Tabby Studios"
  },
  { value: "7691d5ef-4290-4312-a140-96c3c94a8429", label: "Cursed Creations" },
  { value: "d8625594-7c95-4d3e-b6ad-2dbc201ac514", label: "CuttleB0ne" },
  {
    value: "5c1833c1-3730-40ba-bdf1-a1036d0ec110",
    label: "Cwoodsdean Creations"
  },
  { value: "33d3bb92-e464-4cb8-a3d1-46b49a444bb2", label: "Cyon" },
  {
    value: "f0d528c5-2c84-4c1b-b9d9-5f32d32358ed",
    label: "Dalmy Do Dat Creations"
  },
  {
    value: "54463320-0df8-426b-89da-89e6fae62382",
    label: "Dandelion Fursuits"
  },
  { value: "9194402d-ab28-4cc9-a34d-e15e35387270", label: "Dandy Designs" },
  { value: "80f9e4c0-38e0-4d19-98a5-141b14dcbd26", label: "Dandylions LLC" },
  { value: "4dbba36c-3ccc-4c58-8b7b-f96a4068e148", label: "Dark Creations" },
  {
    value: "8ec1e3bb-03cd-4cfb-93ab-326ba0826d8b",
    label: "Dark Rainbow Dragon"
  },
  { value: "4d5affb7-4f89-4723-ab81-dd413c129903", label: "Dead Dogma" },
  {
    value: "864fee53-67bc-4f22-8684-aceb863f817a",
    label: "Deadly Creations Fursuits"
  },
  { value: "09609ace-35d9-4d56-bcf2-ffd397e5b9a2", label: "Deathatsix" },
  {
    value: "57636296-fdce-45f5-9389-bf0a78b1af0e",
    label: "Deer In A Hat Costumes"
  },
  { value: "e467fac9-446f-47d0-805b-5dbb756d9019", label: "Deezlberries" },
  {
    value: "bb452578-9c03-43ab-a582-8801500bf5a8",
    label: "Defiant Tail Waggers Anonymous"
  },
  {
    value: "4a8c2270-3a79-4f24-8ac3-211a885f139a",
    label: "Delicious Disguises"
  },
  { value: "4cb69bf6-130c-45b5-bebe-1111233a2c24", label: "Dexterous Zombie" },
  { value: "95b1f707-0485-49b4-ab6c-c2fc33d648a8", label: "Diadexxus" },
  { value: "d9596108-78b6-4909-b049-92142e410891", label: "Dingz" },
  { value: "8354fabe-ea54-4ea3-90f2-572eca34188a", label: "Dire Creatures" },
  { value: "9b7733c4-5aa4-42f9-a8bc-d3d3e6a33b8b", label: "Dolphyn" },
  { value: "12dda003-2636-4464-ae99-aa505d7728d9", label: "Dombrus" },
  { value: "71eb1f14-d7e8-4ff7-ba12-825d5dc40f60", label: "Don't Hug Cacti" },
  { value: "1d79b83d-3094-4c2c-b070-98b992b35997", label: "Dorky Dog Suits" },
  { value: "9c311833-9862-4b3f-b249-5788bf9ff6c1", label: "Dragon-X2" },
  {
    value: "8c28d8eb-f9b7-4602-81f1-21e59fd3e65a",
    label: "Dragon's Grin Studios"
  },
  { value: "d5dbd03f-da55-4c47-aa9d-d55db2ceb41d", label: "Dragoncid" },
  {
    value: "54785028-a6d0-44bd-bea1-ba8d85a03042",
    label: "Dragonfire Costumes"
  },
  { value: "89fa3cb5-1712-4377-855c-ac5a70774887", label: "Dragonfoxdemon" },
  {
    value: "4e143a10-0c8c-4aca-9dcf-f9d112d2474c",
    label: "Drakon Twins' Fursuits"
  },
  { value: "0509b86c-7643-4d63-bc29-0718897846f9", label: "Drakonic Knight" },
  {
    value: "9fb74711-c667-4a55-8cae-b448347f5365",
    label: "Dream Machine Costumes"
  },
  {
    value: "ae063a2c-dd53-4cf9-bb49-98feb617631b",
    label: "Dream Vision Creations"
  },
  {
    value: "9b093c82-5d60-40b2-8a2b-ff84cb1426ac",
    label: "Dreams Come True Studios"
  },
  { value: "c9b4159d-f3a4-4a54-a004-6d706f226b2e", label: "Dresden Complex" },
  { value: "18a27aa3-8504-43a9-aeeb-e10b0e2031e4", label: "DTWA" },
  { value: "c3b36325-53c8-45d3-a3d6-f2bbbff778b2", label: "Dubmutt" },
  {
    value: "55704871-7fd6-4db8-b4b9-867d90f057cc",
    label: "Dynamic Cats Studio"
  },
  {
    value: "d471ddb1-8638-4fd1-92b3-4011f113f5bc",
    label: "Elemental Fursuits"
  },
  {
    value: "c7c8040e-cf56-4fed-8904-0cc3c4258a5f",
    label: "Elk Craft Fursuits"
  },
  { value: "27561022-73a8-44cb-abd6-dbda4490134c", label: "Ellies Fursuits" },
  { value: "1de30269-8e34-4afa-955a-f47c18f042af", label: "EntryLevelFox" },
  { value: "e8f1e7b3-921a-4ac2-adff-533e258c015f", label: "Errowolf" },
  { value: "d069da81-7cbe-480a-a0f6-9db601d25279", label: "Esuterure" },
  { value: "5f7ece7f-c122-400d-b5eb-e02c227b4f20", label: "Eternalskyy" },
  { value: "1c98d728-caca-4a07-b0fc-62025a28a9bb", label: "Euharmonics" },
  { value: "81026864-8f0a-40d3-b824-81d635555792", label: "Evil Bear Fx" },
  { value: "ace9180e-70eb-44ff-bf1a-8227f30e45be", label: "Evozarro" },
  {
    value: "900c3a2d-edfd-40de-b6bb-f5a8dfae8302",
    label: "Excelsior the Lion"
  },
  { value: "da0791d0-284b-42bd-bc2b-3e6b4c08a0e9", label: "Ezza" },
  { value: "4d0a1743-c49b-4406-a39c-fc95052785fc", label: "Facemakers Inc" },
  { value: "4f72aece-22f6-400d-a827-cab6d02303be", label: "Fallimar" },
  { value: "6427f5f2-0921-4f2d-8ba9-926ade24a66c", label: "Fancy Beast Suits" },
  {
    value: "fcdf08c8-2bb9-44bd-95ab-c0552df83b3e",
    label: "Fancy Fish Fursuits"
  },
  { value: "17942c4e-aee4-4a07-97dd-070609abcd8f", label: "Faris Batwan" },
  { value: "5f1d967a-890c-494b-a4c4-01b4dd5c4fac", label: "Faruku Costumes" },
  { value: "a59097e3-fad0-41a6-bb8a-79738bdb539d", label: "Fatazndog" },
  { value: "3d5dd518-4dee-4d62-9331-d510137dfb35", label: "Fatkraken" },
  { value: "eb15fc84-fd37-433b-ac26-ba9f10996061", label: "Fauxpawroo" },
  { value: "fd6605d0-f22e-437d-87ab-d03020648b8f", label: "Feast of Dreams" },
  {
    value: "2b744542-ac9a-4f79-8c8c-7772e495ba16",
    label: "Featherbat Fursuits"
  },
  { value: "edc754d7-c786-4dc9-8c4f-92c07a3502fa", label: "Feely's Den" },
  { value: "aa1ed830-b45b-498e-a6d5-32d169d012ca", label: "Felixkatz" },
  { value: "346c574c-0837-4996-a50d-b53e793fe9a3", label: "Fenné Crafts" },
  { value: "e2af743e-41c1-4778-81bd-86daf8515b05", label: "Fenrirs Child" },
  { value: "ac2d64b7-3b2e-4df8-9b0b-3c89e46782b8", label: "Feral Facade" },
  { value: "c6f2d964-78d9-4909-a5d1-dab771310a59", label: "Finnish Fox" },
  { value: "62d27e4e-77f8-4114-b8d0-7c473f396fad", label: "Fionka Fursuits" },
  { value: "d29e419a-1cc3-4a96-9d35-e8609fbd2fd6", label: "Firestorm Six" },
  {
    value: "811b633b-36cc-4f5a-85d7-2b826f4bcbff",
    label: "Fish R Furiends Studios"
  },
  { value: "a7fe985e-8534-479b-b993-7bdbb600754e", label: "Fixit Fursuits" },
  { value: "23b0649b-f357-4b0a-a472-e902452ad92a", label: "Flacko" },
  { value: "cc0dc4c5-7e56-4edd-8d0d-a69a9037383e", label: "Fleecerot" },
  { value: "32f83a8c-203d-484c-8b71-2dd50a1e0bad", label: "Fleeting Fennec" },
  { value: "84971e32-3ab8-44f5-aefb-ba555df3da4a", label: "Flix Dragoness" },
  { value: "9802a9cf-1b57-4aff-a2a6-7f5304200ce0", label: "Flixsuits" },
  { value: "16afdc11-6346-4002-9278-5e8caec3dedf", label: "Floof-Batsuits" },
  { value: "cbf95d88-eb96-4014-bfe6-47ba11031656", label: "Floof Unlimited" },
  {
    value: "b0cc1ae3-6791-40e1-b0cf-987a9e261000",
    label: "Flowercity Fursuits"
  },
  {
    value: "e987435d-bce9-400c-8f8b-a01fa61bfbfe",
    label: "Fluffenough Creations"
  },
  {
    value: "896a76d0-e23c-423c-964d-1f77ac87c948",
    label: "Fluffy Stuff Studio"
  },
  {
    value: "1d6ee0df-7515-4e21-a7ca-1d19ba3c68e6",
    label: "Fluorescent Paw Works"
  },
  {
    value: "fb513992-83c4-4d89-b085-0f01f2a408ad",
    label: "Forever Furry Creations"
  },
  { value: "86829ea8-2834-4264-9365-4ebb894abfb5", label: "Fossa Studio" },
  { value: "ef840419-0eeb-43fb-b864-0bddafe12dbf", label: "Fox Convoy" },
  { value: "79225045-4329-404b-a836-513fe917d21e", label: "Foxfairy" },
  { value: "a626c56d-324c-4bfc-b4cc-100b33a9307b", label: "Foxfeather" },
  { value: "908f431e-29b2-4ccb-be9e-612cab91410b", label: "FoxPupMeow" },
  { value: "bc7b87be-3072-4207-8264-da1e992b05f5", label: "Foxysox Studios" },
  { value: "a7e43c46-9137-493d-92dc-9536d431b2d9", label: "Frazzles626" },
  {
    value: "b8994c6c-d112-4380-9e7c-70c936064975",
    label: "Freakhound Studios"
  },
  { value: "6ed6043d-ace2-4676-98f7-3e797e88d94a", label: "Freaksnow" },
  {
    value: "96f0f994-1d90-4033-b677-18e4789caf5e",
    label: "Freedom Spirit Creations"
  },
  { value: "edab4365-96d9-4c26-976f-8cab50537174", label: "Freya Fox" },
  {
    value: "102ecf33-0ecf-42ab-bb49-b2b7b8a4ea2a",
    label: "Frostbite Fursuits"
  },
  {
    value: "0d345dca-40b0-4414-84a9-74262c802927",
    label: "Fruitsuit Creations"
  },
  { value: "b4a54f27-9a62-4eba-ac69-400d1a397f19", label: "Full Moon Special" },
  { value: "a2571c9d-7db8-48e6-af23-5238331f5dc9", label: "Fun Fur All" },
  { value: "80a85fd6-1937-4ba5-a2a6-c206367914da", label: "Funky Soul" },
  { value: "cd12c1c8-1181-4dad-be1f-2349e149f526", label: "Funny Farm Makers" },
  { value: "11a0c3fa-8b8d-4817-a0e6-5f6edc41c260", label: "Fur and Feathers" },
  {
    value: "bdc209bc-c01c-42bd-8f60-7f0fe4fd2ea9",
    label: "Fur Fancy Costumes"
  },
  { value: "c60bbb22-5511-4c8f-a6a8-a3b6fd77652a", label: "Fur It Up" },
  {
    value: "0de4b995-9d03-4b0d-ac41-2879e0ad1790",
    label: "Fur The Win Studio"
  },
  { value: "011dbc36-63b6-4cce-9336-d065a25336bd", label: "Fur Your Dream" },
  { value: "197d32eb-8464-48b0-8bbd-ac623f3571ff", label: "Furbrications" },
  { value: "1fb799c1-9aa6-4637-a953-ab308ef3d445", label: "FurDelicious" },
  { value: "b1c71e10-5911-46a0-adfc-4c70f7ffbb98", label: "Furducers" },
  { value: "c268fff1-8742-405e-9115-2926b9486ab2", label: "Furensics Studios" },
  { value: "e53c16e6-6683-4655-956a-45a53652f483", label: "Furfancy Costumes" },
  {
    value: "31c10dbd-d949-4aa6-969a-a48624ac4cda",
    label: "Furfect Pit Studio"
  },
  { value: "eeec0637-8a7a-4a87-9e5b-30ba6645cdd7", label: "FurForge" },
  { value: "fe9155c8-c4e9-438b-826d-c0a961598584", label: "Furfrontier" },
  { value: "515cec6d-8dce-424f-bc56-774bcf31d089", label: "Furgen Studios" },
  { value: "dbda5782-3028-42f9-93b4-20f8914e793e", label: "Furhonor" },
  { value: "aadceed7-2776-4246-81f3-557dc45784f2", label: "FurLaMascota" },
  { value: "51f6ac67-9423-49d1-9ce5-54948f5d0b18", label: "FurR Club" },
  { value: "7918964d-2535-4077-8179-8e8967680a7a", label: "Furr Happens" },
  { value: "c2103569-e9c9-4dfa-83bc-d980f9436f13", label: "Furred Fantasies" },
  {
    value: "b8d8df84-4915-496c-b90d-0105dae29f7a",
    label: "Furred Out Kreations"
  },
  {
    value: "7c3b7b24-5341-4d42-a43e-40dcb6490611",
    label: "Furry Crossing Creations"
  },
  { value: "b28042bd-87b3-43a3-a7a0-22aab60b3c0b", label: "Furry Factory" },
  {
    value: "9ed14958-996b-4e8c-8b94-35963137a4ba",
    label: "Furry Fursuit Maker"
  },
  { value: "ca1b600b-77c2-496a-aae2-e4281fc12b9b", label: "Furry Machine" },
  { value: "b81ae973-bae4-4478-92d4-3bf9075a0f67", label: "Furry Squad" },
  { value: "ef7099ce-3025-4d10-9633-dc663173f3f8", label: "Furry Studio" },
  { value: "88a0c6b2-7e6c-4de6-b7eb-04effa69160a", label: "Furry Tailor" },
  { value: "820da584-ab36-4ee7-b10c-1878aecb9453", label: "Furry-K9" },
  { value: "c0b9c4e0-8130-4f09-aee3-3b42cc08f051", label: "Fursewna Studios" },
  { value: "ce17da84-1d18-408b-bd73-55c02e48dbc3", label: "Fursonalities" },
  { value: "d0739575-c857-4d93-bfc6-81c80d5e2e60", label: "Fursuit Creations" },
  {
    value: "01ff593f-83d9-4ea8-bcda-d0e702ecadac",
    label: "Fursuit Enterprise"
  },
  { value: "cdd975ee-bdfd-45b4-b5c1-21f46c07f1c8", label: "Fursuit Funday" },
  { value: "066225c1-3e9c-4c70-8f9c-7eb3e9181272", label: "Fursuit Parade" },
  { value: "cace9502-345b-4f69-bfb1-a5870bdaae0a", label: "Fursuit Up" },
  { value: "704295e9-ca7a-4798-99c8-0bc395d6aee1", label: "Fursuits by Lacy" },
  { value: "db0d142e-43fb-435e-89cb-43c1d377492c", label: "Fursuits by Mars" },
  {
    value: "6f782e5a-abe5-4ffb-ae9c-b4955fedfc5f",
    label: "FursuitsUK Creations"
  },
  { value: "3e997c81-e08f-430d-b3ba-3bd8d378eade", label: "Furtastic Studios" },
  { value: "6bd2bc96-4eee-44c4-9230-79ee7620ad1a", label: "Furtic Studio" },
  { value: "ff9cf5d9-12d1-4b0a-a3d8-27b2e4057ad8", label: "FuruArts" },
  { value: "67f5acdd-b0ce-4c92-ac6f-be06a1ed0ed6", label: "FurZombie Studios" },
  {
    value: "82e622f4-9b40-4397-9c1e-3da7fbd276d6",
    label: "Fuzz Butt Fursuits"
  },
  { value: "fbb9cea7-5e06-4737-bc16-27f58a6ffcde", label: "Fuzzworks" },
  {
    value: "ee286457-8377-4662-8160-71974909c1c2",
    label: "Fuzzy Buns of Steel"
  },
  {
    value: "1966ac1a-70f9-46e1-9148-73b6dd7f52d4",
    label: "Fuzzy Fur Creations"
  },
  {
    value: "8b357bc8-0bb7-4741-9190-c8ebebf37810",
    label: "Gaderian Wolf Fursuits"
  },
  {
    value: "66a98cbe-ee2e-464b-9543-b3af4ecf6da8",
    label: "Galaxy Wolf Creation LLC"
  },
  { value: "05eb9624-2919-44f2-a086-f9f3b298608a", label: "Galesmilax" },
  {
    value: "23e06a17-1a0c-467b-a5f2-de1e4b3c08a8",
    label: "GEEKpaw Productions"
  },
  {
    value: "86502263-83ef-4d2a-8ea2-ffb7841b26b4",
    label: "Ghostwoodcreations"
  },
  { value: "92e5b89b-b112-4a03-ab39-4a3870a005ca", label: "Gitz" },
  { value: "194b15cd-2638-4b4b-a639-3a1595293ae5", label: "Glow Fox Studios" },
  { value: "61ed0790-a8e1-45c2-aa5f-c2c01711f51d", label: "Glow Sheep" },
  { value: "21e2c8e4-61bf-44d6-872f-dc3ae43e25b7", label: "Go Fur It Studios" },
  {
    value: "d893a80d-b211-464c-a53d-5bef1a3d472a",
    label: "Gold Ribbon Studio"
  },
  { value: "d113c516-18a6-4f02-9290-ce8b2cc44e58", label: "Golden Maw" },
  { value: "87314bb1-4a74-4877-8f26-683cefd2616b", label: "Goldmouse Studios" },
  {
    value: "c5375f06-ee94-42ea-8770-673f38e0ebc3",
    label: "Graveyard Stuffers Suits"
  },
  { value: "7b75d37c-a873-4c63-863f-c0924705fef3", label: "GrayREALM Studio" },
  { value: "70405c29-827e-4d8b-925a-1907ce68ef41", label: "Greyfox Workshop" },
  {
    value: "a1991588-8ef6-43aa-8a33-7509d9f860fe",
    label: "Grinning Tiger Disorder"
  },
  {
    value: "97f24591-d2d6-4a6b-a825-461b7d2de769",
    label: "Gronway Commissions"
  },
  {
    value: "348c106a-9e5d-475a-8d36-c944b373be91",
    label: "GroovyGoat Costumes"
  },
  { value: "e489e528-a5a7-4ae2-a96a-64b1d68213ed", label: "Grotto Creations" },
  {
    value: "a52a6bb9-b8c1-4996-b233-75040de21ce2",
    label: "Grove City Fursuits"
  },
  {
    value: "20b32af5-de8c-4721-8766-7f659ee4971b",
    label: "Guinns Custom Creatures"
  },
  { value: "6bfcc0c1-dbbd-4f81-9041-d91014d8fd69", label: "Hakumei House" },
  {
    value: "890a5553-7177-4b09-bbf9-e94be845d06f",
    label: "Halfblood Creatures"
  },
  {
    value: "6ae87f4d-acc0-4417-a3dd-d9356de472b8",
    label: "Happy Tails Costumes"
  },
  {
    value: "d9ff530d-1cf3-4dad-9e7d-e9c037f39faf",
    label: "Harvey Manki Kang Cat"
  },
  { value: "7631d7b1-1b3b-46d5-a6ee-f08cc9521814", label: "Hawthorn" },
  { value: "aba144f7-241c-45d7-a4f5-d6272231cd67", label: "Haz Studio" },
  { value: "fb0f1282-b4f7-4290-b8ef-7901d53907ca", label: "Head Over Tails" },
  {
    value: "269c0845-549a-4924-9b75-2bdf87394e12",
    label: "Headless Hare Creations"
  },
  {
    value: "930a58b8-9d9a-4c4d-b968-128206850a71",
    label: "Heads and Tails Studio"
  },
  { value: "1a113648-55bf-489b-a80c-416634df3dda", label: "HeckGeck" },
  { value: "8be9a4b7-4a7f-41a4-a281-205db10fef6c", label: "Hell Charm" },
  { value: "21631df4-e5ec-493a-9aa1-37ee8cd1c7a9", label: "Hidden Arts" },
  { value: "3dfbf19f-7a5f-4524-a10b-de8fe662c0e8", label: "Hidden Treasury" },
  {
    value: "f170bd6f-333c-4eda-93b8-2ff4402c843c",
    label: "Hiero Craft Creations"
  },
  { value: "b0cea83d-2996-4dbe-a771-2d7300691ec7", label: "Hikarinaka (DKAG)" },
  { value: "fecc9af3-4cb4-45e2-bfef-48e3cca0bd9d", label: "HoneyspydeR" },
  { value: "ee1837d1-7002-4834-bab7-bc75d402bfa8", label: "HoofnHard" },
  { value: "e18bdad9-288b-4860-b666-a63a4e98e758", label: "Hounds Teeth" },
  { value: "497de9a2-8254-40f0-adbf-34b0a282c6a3", label: "Hunters Creations" },
  {
    value: "426ba114-6e86-4063-9c7f-74b8cc7c832c",
    label: "Husky Moo Creations"
  },
  { value: "c6bbf94d-2498-4102-9374-7b2aef125ab9", label: "Hybrid Studios" },
  { value: "5d6bc874-394b-43f7-9229-dd36bc2cfc3d", label: "Hyena Girl" },
  { value: "041a72b3-51db-4018-b5cc-6193e2474c3a", label: "Hyena Hoy" },
  { value: "9dbda64d-0fdc-46fa-9119-e196a6bedd05", label: "Hyokenseisou" },
  { value: "565b6669-05fe-44be-971f-bace27b53493", label: "Ichi" },
  {
    value: "9cebb3b7-dee8-4e47-be01-9df589a23fa0",
    label: "Icy Paw Productions (Nevask)"
  },
  { value: "66461e49-0aa8-416e-a18d-a857201a5b56", label: "IJustLoveStuff" },
  { value: "5342b3e9-0814-4acd-aa7c-f094ff7bc0ca", label: "Illimearu" },
  {
    value: "cc9dc978-5ac0-4798-bae4-20f158f59f6c",
    label: "Inajiffy Creations"
  },
  { value: "5b2eed50-cecf-46d6-bd6a-b17066c0c772", label: "Inerri Creatures" },
  { value: "e72cdac9-06e0-41f9-a22f-bb7a20c62d76", label: "Inkfire" },
  { value: "61bb5743-bc5f-4dc5-91e7-03289f137930", label: "Irinae" },
  { value: "ecec5e98-c74c-4fa6-8210-a97d15fa951c", label: "Isabelapparel" },
  { value: "11a3ac7e-84fa-4b96-9078-91dc48327975", label: "Isabella Price" },
  {
    value: "4f434104-0b43-43c6-ba1d-5ece789afd9e",
    label: "ISqueakyPinky (Mini Wolf Arts)"
  },
  { value: "0b904e6e-a23d-4bc3-9356-a9c48846e167", label: "Itallonova" },
  { value: "6ece2d70-806b-4ce1-a42b-cd2284aa90ec", label: "Ivanitko" },
  {
    value: "d0c86e90-3b58-4b16-84a5-f7a4d5d0eafe",
    label: "Jax the Purple Bat"
  },
  { value: "82141972-ad8c-4f41-8cdb-513ce573638c", label: "Jello Vair" },
  {
    value: "133bf66b-b16b-49a9-9b81-608c5e2f27bb",
    label: "Jenetixx' Creations"
  },
  { value: "6809ad64-ad3b-4507-8a0c-fa4b8a2fddb8", label: "Jesse Frosst" },
  { value: "8680f880-a578-43e4-af42-2b52a45e833a", label: "Jill Costumes" },
  { value: "d456adc7-816f-4f37-a325-a2c5f2f92804", label: "JjreamBig" },
  { value: "4f66a60f-692d-4519-a61a-c48d748aa0f8", label: "Johara" },
  { value: "b3de75c0-0559-4bc8-8c4c-584ec5ad987f", label: "Jpupbob" },
  { value: "342d9415-ca89-4f1c-9dc2-3890b1a3eb99", label: "Just Fur Kicks" },
  { value: "7e7e3d5a-5ab1-492c-9304-3bc841af1725", label: "K-Line" },
  { value: "e3b6aeca-1884-4e3b-9a4a-01bfb2b2d104", label: "Kaibab Costumes" },
  { value: "3370877e-072a-47e5-9d5c-86baf765e830", label: "Kaiborg Studios" },
  { value: "9207317f-8294-4b5f-88c7-d1c7bbe0586d", label: "Kaidas Kingdom" },
  { value: "b90de159-85c0-44b6-8a81-2e5778687c90", label: "Kaiju Costumes" },
  { value: "6cb0ff67-ed27-4bf0-b3c7-d131435a90d1", label: "Kaijugal" },
  {
    value: "a0950d15-41c2-4f36-8617-31ecf1fcea01",
    label: "Kandorin Creations"
  },
  { value: "1f2e3804-e29d-400f-84c6-ee1be86d6033", label: "Kangaroo Feathers" },
  {
    value: "62e2e394-9f64-4e3c-b327-5fac842ffe5e",
    label: "Kangaroo Reef Mascots"
  },
  {
    value: "639df81c-2668-42ba-95d6-6d078b0986f7",
    label: "Kani n' Hyacin Productions"
  },
  { value: "b0edc0dc-5719-43a2-b721-4204edc83ab3", label: "Karthegrax" },
  { value: "a1637af2-c2e6-4931-a9e0-0f5b3127fdc8", label: "Kawaii Vixen" },
  { value: "d926c370-6aef-4def-a8ad-7c92acc74f8d", label: "Kayla's Kritterz" },
  { value: "83a8b568-49ce-4b95-817a-f9e8480cfebc", label: "KaZ Fursuits" },
  { value: "fa8fa214-1d03-46a9-b8c7-86e730a70ef0", label: "Kazulgfox" },
  { value: "eaa7f815-ca09-4b3f-bfe1-d2030d37c418", label: "Kazuto Kurama" },
  { value: "18e103e6-5a4f-4d6f-ae34-c2bcaeab53b4", label: "KC Costumes" },
  { value: "52e6dc8d-4b12-40af-85f0-3134ba497ef9", label: "Keeper of Dreams" },
  { value: "a976b9c2-1ad6-4201-9526-27e128a348b6", label: "Kegawa Creation" },
  { value: "0db3125c-36b9-47d5-b4f7-f76eb98504aa", label: "Keiko Vixen" },
  { value: "379d1326-0b21-440e-91c6-59da9e62be36", label: "Keira Blacktalon" },
  { value: "b3ab54ce-a2c8-4832-b137-b2f744f20896", label: "KemoSuki" },
  { value: "beaaa49a-f70d-4996-a889-84948855a48c", label: "Keto Fursuits" },
  { value: "e09290d7-8b94-4f92-8360-46044be2bb1c", label: "Keyoki" },
  { value: "2e726b30-ef78-43d1-88fe-699b2fc13e2f", label: "Keyoto" },
  { value: "b694e382-ebac-457e-9756-f9d63ec1e8e6", label: "Kilcodo Costumes" },
  { value: "6257d961-df3c-4186-81c2-04b8d1eeee50", label: "Kimba Snowpaw" },
  { value: "0429eefc-f764-4b43-892b-54e9550960fc", label: "Kinghime" },
  { value: "0e8dc491-e233-476e-bf63-48fde237afa0", label: "Kinred Fox" },
  { value: "f08e8795-9169-42a9-bb25-530e4a42ec81", label: "Kisu" },
  { value: "97b6cd43-59c5-413d-ba24-f66d13bbd807", label: "Kitsune Illusions" },
  { value: "96408d29-d1e7-4503-860b-0f6118009c31", label: "Kitsune Studios" },
  { value: "16d889ea-69a1-413a-8857-da632a224b5c", label: "Kitsunerawr" },
  { value: "baf41149-7884-44b2-8a6f-4d67b2b732a6", label: "Kitt Creations" },
  {
    value: "d5c415d7-3015-4375-b81a-4d49fac19336",
    label: "Kitty Fluff Costumes"
  },
  { value: "c8c630f8-115c-43ba-a0f7-5704651ab309", label: "Kiwihunter" },
  {
    value: "e6bcc3dc-00c0-4d6b-ae94-16fcdf770cf0",
    label: "Klickitat Matrices"
  },
  { value: "34a0ccc9-fbc5-461d-9391-5bd0b56ee1b0", label: "Kloofsuits" },
  { value: "471a90df-95be-4321-9b6e-de2f6c79744a", label: "Knossos" },
  { value: "20da4b29-8cd1-4e07-a2b7-d8271aad3a28", label: "Kodi Fursuits" },
  {
    value: "b16e3fe1-3e41-42a5-9e77-bb890c52a025",
    label: "KomicKrazi Studios"
  },
  { value: "80413b61-86d7-438c-8ed0-a60f5327abc8", label: "Kurauno" },
  { value: "6beb14f1-1f28-462a-927c-d9ee69186e79", label: "Kyanite Creations" },
  {
    value: "f63338fc-f2c0-4aa2-bf99-046e1157908e",
    label: "Laela McPitty Suits"
  },
  { value: "468e3c70-4b08-46c9-8242-8381eea9c09e", label: "Laken Steeljaw" },
  { value: "9f7c5a1e-2905-4cfb-935d-553e67bc0664", label: "Lavafox" },
  {
    value: "16037993-f341-4d06-b785-48e9a3d24e6b",
    label: "Lazy Leopard Fursuits"
  },
  { value: "3a4dd1f7-1062-4f75-9d0a-b73237d3bbd9", label: "Lazy Lupe" },
  {
    value: "cd10dc4b-1342-41de-bf66-e8e697d95493",
    label: "Lemonbrat Fursuits"
  },
  { value: "3ba6a085-13b5-4278-b390-8be5f8458789", label: "Lenny Mutt" },
  { value: "d8aea74e-a0b1-4195-b185-14c88eec363d", label: "LeoneLaTwerk" },
  {
    value: "e2033a8d-d54d-4717-96d6-9f7389cf4076",
    label: "Leopardcorgi Creatures"
  },
  { value: "97a280c3-279f-469b-86f1-b8c53879180e", label: "Lhbeau" },
  { value: "549ff58a-cf02-4dbe-9ed1-124ebcfbcaa5", label: "Ligercraft Suits" },
  { value: "97edd1fd-1e1a-46b3-bde8-0676ba6d84e0", label: "Lillie Likes Peas" },
  { value: "b2d7a936-5c05-462a-b66f-9a40725dd0ce", label: "Lion of the Sun" },
  {
    value: "308c4154-3607-49d3-9daa-d8e354f6027b",
    label: "Little Fangs Fursuits"
  },
  {
    value: "a1fcef68-964b-4eac-a81b-8a48748dc3b2",
    label: "Lizard King Designs"
  },
  {
    value: "26b724c7-4623-4143-8115-1470d27e7201",
    label: "Lizard Loves Mustache"
  },
  { value: "eba93433-9f14-45ea-958c-070ce5a12223", label: "Lizaruk" },
  { value: "45dcf8a3-6d70-4906-aa31-f26f6b199ace", label: "LKR Mascots" },
  { value: "0d69304e-21f1-4878-b46d-fed776a30105", label: "Lobita Works" },
  { value: "15e13716-bcab-4ed2-859d-679e478ebcd9", label: "Locado" },
  {
    value: "5c852601-e177-4644-8c36-6bbf5f625e2f",
    label: "Locomotion Fursuits"
  },
  { value: "a2460d11-b915-49f6-a055-842bf3d74c73", label: "Lodi Dah Fursuits" },
  { value: "31b52f2e-60c5-4187-8009-b0a2d25717a2", label: "Loris" },
  { value: "6ec29ba4-146e-4af3-baa3-1e15d6146283", label: "Loui" },
  {
    value: "96509c19-e652-48ee-b01b-5da602d57432",
    label: "Lucky Dog Fursuits"
  },
  {
    value: "3d5adbd0-7a95-4b2c-8a93-8c41422821c1",
    label: "Lucky Gum Fursuits"
  },
  { value: "3612fc3d-db68-478e-9102-50ba5778d19c", label: "Lunar Forest" },
  { value: "b94607d1-5499-491d-82e0-a330119f8ff4", label: "Luno Vulpes" },
  { value: "409dd130-6bea-4f3a-98d1-c8f1377c4e71", label: "Lupinemoonfeather" },
  {
    value: "25da9626-ecd5-4e28-918f-6b2a86e7e141",
    label: "Luskwood Creatures"
  },
  { value: "1af747ef-dd3d-4e7b-9ec8-cb9cd8b210ec", label: "Macaroni Market" },
  { value: "32907efc-a739-4231-8d5c-fa02fda3711a", label: "Mackoolzie" },
  { value: "c4a4a393-d7dd-4ae1-9512-ec979c66d8ae", label: "Made by Mercury" },
  { value: "b3f88bba-2534-4cc4-9625-b219ec03a92e", label: "Made by Muttmix" },
  { value: "f1f9380a-4d1b-432c-b640-73896336bfa5", label: "Made Fur You" },
  { value: "311c38af-85dc-44e9-a631-5a4aefc117f0", label: "Made in Holland" },
  { value: "5ae1c709-3b63-435f-b412-b5e4ab197201", label: "Made4Hugging" },
  {
    value: "f171a3ec-1a06-4110-80b8-c1c918f911d4",
    label: "Magic Foxy Artworks"
  },
  { value: "7d46a035-53e1-4746-b37b-57a5c5592de7", label: "Pokem" },
  { value: "2d3741e1-2a96-4bda-bcdc-a89bcccb4a71", label: "Magnus Diridian" },
  { value: "8c0f73c1-4b45-44e4-85d1-c6aa0a4c06f4", label: "MagpieBones" },
  {
    value: "1cdb3c51-a705-4616-934a-09fb62a5f0dd",
    label: "Mango Island Creations"
  },
  { value: "abf79b5a-3f3f-4545-a454-2b7e603b42f9", label: "Mangusu" },
  {
    value: "97546d6a-2b3d-4b50-a3f1-5f29d375b51f",
    label: "Maria’s Creative Corner"
  },
  { value: "a202c891-b89f-4390-b55e-0e9f68f4cb11", label: "Marylen Costumes" },
  { value: "2e61ac1d-1c6d-427e-97ed-870908319041", label: "Matrices" },
  { value: "e578d207-006d-4cbf-ad31-932c5b604f85", label: "Mei Fursuits" },
  {
    value: "95a8547a-0321-408a-9b09-b3fc19155c04",
    label: "Melissa Mendelson Art"
  },
  {
    value: "5a7ce802-18f1-488d-98c8-88f5d4756659",
    label: "Menagerie Workshop"
  },
  { value: "f0e8e2d1-8d75-4037-985f-8e88c9613029", label: "Mercifur" },
  { value: "3febf3b5-4e0e-455e-98d0-8eed40d29684", label: "Messerschmitt" },
  { value: "3c232c68-777b-4c18-a3e6-769d02e49613", label: "Metaldog00781" },
  { value: "26a3946a-909b-4127-9545-f957299c68ca", label: "Micro Mascots" },
  { value: "642c84f2-893f-4cd1-b900-5312238b0c70", label: "Midnight Swimmers" },
  { value: "d078aab1-773b-4061-a7cf-13f11991d1b3", label: "Midowko Art" },
  { value: "f005fec3-8a3f-4d0b-aeed-a97cb7285599", label: "Mini Boss Mascots" },
  { value: "71e00235-78b8-4ad6-836b-fb5e8d94fbbd", label: "Mirepoix" },
  { value: "a6ede6d9-f09a-4ccc-896d-933a7247a2f9", label: "Mischief Makers" },
  { value: "2834d0a9-8ffa-4adf-90c7-fa1dae66aab5", label: "Miss Wolfiee" },
  { value: "8e50eafa-3af1-4415-b3c5-5eb158689eac", label: "MissRaptor" },
  { value: "92204b8f-bfa7-41a0-854a-4d6907e2d0cd", label: "Mitha" },
  { value: "22ec9a2d-7250-4115-9590-fe377ff6bfcd", label: "Mixed Candy" },
  { value: "bd4e848b-33fd-4c66-9393-b448e0c6c96c", label: "Mixed Monsters" },
  { value: "e835f812-2c7c-4b51-80a3-a4a5e8117c55", label: "Mochiri" },
  {
    value: "0fcae93e-8d99-4d93-be54-0bb816722ab0",
    label: "Monkaus Furry Bitz"
  },
  {
    value: "8318cee8-3623-432a-9e6b-943c31ba7217",
    label: "Monster Cat Creations"
  },
  {
    value: "e56cabd9-6542-4db3-8871-794fa4ac40ad",
    label: "Monster Deer Creations"
  },
  { value: "132e80ad-74a2-48a1-bc6d-c1727f570fba", label: "Moon Devourer" },
  { value: "2100d403-afb2-4b7b-b82a-bb272dfa437b", label: "Moon Mochi" },
  {
    value: "d85ddda1-4c45-4a96-830e-99c8d44b7e89",
    label: "Moonlight Delights"
  },
  {
    value: "06e8734c-82ae-44c4-97a6-bde5c4fa3c5e",
    label: "Moonlightbatshadow"
  },
  { value: "da8a9ffd-700f-43b8-8c4c-878d919356b2", label: "Moop" },
  {
    value: "b81501fc-46c0-4582-90af-26edaffe3ba5",
    label: "Mordrudes Monsters"
  },
  { value: "7a75ccd7-4cf6-42cd-9342-214897b5f8d2", label: "More Fur Less" },
  {
    value: "1c0a7cf0-c9ec-4597-ad87-80f474f9e41c",
    label: "Mostly Bad Costumes"
  },
  { value: "2de2c4a6-a0ff-4be8-81a2-ba3b2efdcff9", label: "Mothsicle Suits" },
  { value: "3304e2be-6c97-4c4b-8879-06a35af60ea6", label: "Mugiwara Cosplay" },
  { value: "2d3fe00b-37bb-4f91-a6fa-f635ec101b4d", label: "Munchkin Bunny" },
  { value: "ef57b946-2bce-4156-b0d9-eb2f402dc839", label: "Muntjacked" },
  { value: "ff6f34a7-a37b-4d5b-af00-f5b5d4da15ae", label: "Mushi Crosshairs" },
  {
    value: "c74db401-f4e8-4b17-8694-5945fe393d8b",
    label: "Mut-Mut-Fur Costumes"
  },
  {
    value: "3c825664-8930-405c-8ded-bde4b540aef3",
    label: "Mutt-Zilla (Marshmellow)"
  },
  { value: "4873e4d3-5d43-4b2f-a4d7-e0f5bdfd7044", label: "My Fur Creations" },
  { value: "baed1e8b-f282-48fd-9481-f0ecc38224e2", label: "Myrtle's Monsters" },
  { value: "2393b9a7-b741-4ec3-949d-4d7e57087b31", label: "Mystic Creatures" },
  { value: "7799fb4e-e85c-44e1-b1d4-17ebe5a3798c", label: "Mystikreatures" },
  { value: "68822808-a960-4f8f-b40f-15c21eb3ae81", label: "Nafierye" },
  {
    value: "dcfcb026-0177-4ca4-be35-9a234c8219ec",
    label: "Nagowteena Costumes"
  },
  { value: "948b1e17-77d9-4318-9d8a-ed3035b76041", label: "Natsuro Suits" },
  { value: "82738d1e-ceda-4949-be95-505cb7fcd629", label: "Neala Appaloosa" },
  { value: "3eaf62da-a264-418a-9980-2396ac810f1a", label: "Neex" },
  { value: "0e5c5d47-b6df-4f31-9b6f-a4374e7f4de7", label: "Nekofelin" },
  { value: "fd658c38-57a3-4e2c-a913-290f9e319f8f", label: "Neon Fur Studios" },
  {
    value: "54ad16ab-f49a-4ad6-984c-526a234c02cd",
    label: "Neon Puppy Creations"
  },
  { value: "dbbd652b-f45c-498e-96d4-0e18f02a62b0", label: "Neonr0se" },
  { value: "4f9690dc-d856-43e1-a818-9b3330540861", label: "Nether Den Studio" },
  { value: "fa05d889-71d8-45ee-bcd0-e8ee946e1ef8", label: "Nifeline" },
  { value: "8c61330d-cef6-403f-a03a-fca10c12f806", label: "Nightfell" },
  {
    value: "49fffeb3-9b50-4296-96c8-1bca529fc785",
    label: "Nightmare Beast Creations"
  },
  { value: "42817c0e-8596-44c6-a0bc-979a0aa5af5d", label: "Niiku" },
  { value: "ebb60e12-3454-4091-9601-6a80213528ed", label: "Noble Productions" },
  {
    value: "eeec8ffe-3ff5-45e0-b7fa-4d6443d1757b",
    label: "Norman Patches n' Furs"
  },
  { value: "b3eb286a-0616-41fd-85f2-7bd929f26ec3", label: "Norsepaw Studio" },
  {
    value: "12c452a0-4784-4442-b302-773b83182cb8",
    label: "Norsewolf Creations"
  },
  {
    value: "970d1325-e688-4593-bff1-5065070ec762",
    label: "Northcat Creations"
  },
  {
    value: "675d239b-6453-49e4-ad63-64d2edd88f9c",
    label: "Northern Lights Costume Company (Wolfbird)"
  },
  { value: "c30f43ef-0123-456f-860f-c27cee695949", label: "Northfur FX" },
  {
    value: "11e59ebf-1301-4174-8213-292423bbc6e4",
    label: "Northshore Mascots"
  },
  {
    value: "0636d83c-125b-4be3-b01e-09a0c21a9464",
    label: "Nucler Fur Creations"
  },
  { value: "4e4d2b5d-2a9c-4197-acc4-e3ab68d5765d", label: "Nuke Creations" },
  { value: "37cc629c-7f4a-4b7b-9ebf-18380c04abe5", label: "Ocicat" },
  { value: "8f13193b-4506-4a0d-8050-34aa0993681c", label: "Og's Fursuits" },
  {
    value: "f7c4fd28-9d1c-4b56-b8dd-d272d1d88223",
    label: "Ohmega Suit Studios"
  },
  { value: "ad18cb94-01c5-43e8-910e-db01c42df38a", label: "Omega Paws" },
  { value: "73fbd3d6-29bf-4d0b-afe0-ddbbb39fdbfc", label: "OMG Pineapples" },
  { value: "f842f2a5-b634-4063-93a2-7338ee5b67b7", label: "Onai Wolfwind" },
  { value: "a98e659c-a4ec-40d9-91ff-701324aa1247", label: "One Eyed Doe" },
  { value: "705bf3bb-dfb0-4bc1-9d89-1f1945e44aa1", label: "One Eyed Jack " },
  { value: "f57e17b3-c08c-4823-ac78-2c896f8cdddf", label: "One Fur All" },
  {
    value: "b286771b-ee56-4cdf-a798-4f9b6b2ed138",
    label: "Onix Angel Creations"
  },
  { value: "61f29345-4d09-4ea9-8173-3a2abfa4e726", label: "Orwin" },
  { value: "d535bec7-a15d-4312-8e1a-e97c160b9568", label: "Otter Nonsense" },
  { value: "c27918ad-a140-47a9-b93a-ae0e742ce29c", label: "Otter-n-Daughter" },
  { value: "3cf2b2a7-ed3d-475a-abc1-d178c751860d", label: "Our Mass Hysteria" },
  { value: "748d184c-7694-457e-a348-edfe3578781d", label: "Oz Kangaroo" },
  { value: "08e58b7a-14ed-451a-979e-392b9cea03f3", label: "P Pardus" },
  { value: "c35ec82a-f7ed-4ed8-9b1f-1096b02987a2", label: "Paciulo Fursuits" },
  { value: "65c3946e-b3e3-45ee-95ab-c045798ebdac", label: "Paddlefoot" },
  { value: "02ee5ce9-b5cc-48c2-b3cd-5b79404c59bc", label: "Palohmino" },
  { value: "e81ebb80-d2ec-4a51-a923-bfb9fbff6adb", label: "Patchworkpibble" },
  { value: "dd152b33-de07-4b93-b3ff-fa7fd5e638fe", label: "Pawaii Suits" },
  { value: "b9032455-7cbc-4697-85af-4ed9268faa6d", label: "Pawgazer" },
  { value: "9ed10db1-ff33-4354-9d85-7ecd749472e3", label: "Pawie Paws" },
  { value: "eb3cd4ff-133d-48ff-8b5f-e7921c73213c", label: "Paws Fur Effect" },
  { value: "298a379a-72ee-4933-bfc3-a2402225bd81", label: "Paws Productions" },
  { value: "613b3150-3af8-40b7-9591-4337c81e69d8", label: "Pawsome Furries" },
  {
    value: "5765f2c6-d47c-418f-bc63-8bb8abba5433",
    label: "Pawthentic Creations"
  },
  {
    value: "158a7aa3-54d0-4d98-aba4-8b72e03a15d0",
    label: "Peacewolf Creations"
  },
  { value: "52d2b78d-e6a5-475d-b932-1f8a7091068f", label: "Penpenfoli" },
  { value: "a0ce1a4c-8cd9-4e96-8d43-e65dde3714bd", label: "Phar" },
  { value: "5a26630e-85e0-47d3-94a0-3184d8e0bc81", label: "Phoenix Nest" },
  { value: "a5b96944-2e3a-4712-9f71-a9780c2f4af0", label: "Pink Fox Works" },
  {
    value: "d5a258b0-817e-4b46-b7db-a2a6a2d92263",
    label: "Pink Gecko Productions"
  },
  {
    value: "95d212ac-2d18-4e4e-a380-6c69f14e8574",
    label: "Piranha Petting Zoo"
  },
  { value: "20117dd4-9a73-4efe-abb1-41ca56016434", label: "Pocalypto Designs" },
  {
    value: "c4310ef1-e57b-400a-8451-10b600799dbb",
    label: "Pocket Wolf Fursuits"
  },
  { value: "dce40f8c-b3aa-4209-ab7f-94820bbb1156", label: "Polarlight" },
  {
    value: "860f1203-0555-42de-ab36-534dc7b19da9",
    label: "PotatoMonster Cosplay"
  },
  { value: "0dd6e4ad-5d13-44e1-b9d7-f544d6e82516", label: "Pouchhopper" },
  { value: "5b4bd3ec-d743-420c-a773-b56094cb9fd5", label: "Prefur" },
  { value: "c61545ea-cb2a-4d45-b402-9cc7e120364f", label: "Priamwolf" },
  { value: "a5614ec2-1bd0-4f11-82b6-5be4c6f4c672", label: "Primal Art" },
  { value: "0f8df301-74b0-412d-883d-c703e9ff1d28", label: "Primal Visions" },
  { value: "a979caed-61c0-4957-a74f-e7b163046614", label: "Psybird" },
  { value: "06f8a2b5-d840-4e79-86c1-b254e1735853", label: "Pup1K" },
  { value: "7b64ec8e-f005-491b-97d1-3ebd8a191027", label: "Pyrope Costumes" },
  {
    value: "20982289-4788-43e6-8e7d-54136a698de9",
    label: "Queen of Yeen (Crafty Hyena)"
  },
  { value: "64838f86-6a7e-4be5-8072-0f8eb1c82759", label: "R5 Suits" },
  {
    value: "2da1fa2a-157a-4aa4-ab29-0fdf30ee6574",
    label: "Rabbit in the Moon"
  },
  { value: "0950ea04-8bc7-483f-a57c-881c20d89b1c", label: "Rachel Loal" },
  { value: "2bd1f075-ac33-4271-9976-1ad19aa01f86", label: "Radioactimals" },
  { value: "56ae08ca-be7a-429e-a245-27ca32e9a41f", label: "Raditz Wyvern" },
  { value: "67791926-d3a0-482f-a2c3-8a657893c89e", label: "RadPandas" },
  {
    value: "e0dae1ff-7696-431a-95c9-8c51648fe3bc",
    label: "Rage and Roar Customs"
  },
  {
    value: "1a020116-a038-422f-95c8-ea7a1b147005",
    label: "Rainbow Productions"
  },
  {
    value: "0f25b0a8-bae6-4151-acf1-def0239915b4",
    label: "Rainbow Wolfie Creations"
  },
  { value: "742af24a-52f8-4b19-b33c-5d3fc5d6dd87", label: "Rainbowbeatz" },
  { value: "012b0f77-11a9-47c4-904e-249a62fc1321", label: "Ranshiin" },
  { value: "36ada1d0-de37-41b7-a99a-f28b5c3a58ba", label: "Rastafarian Lion" },
  {
    value: "a023fbea-c90d-4e59-8067-1f6eab817680",
    label: "Ratty Mischief Creations"
  },
  { value: "56b4d9f0-2cb3-414a-828d-76c287a426f9", label: "Ravell" },
  { value: "ff226874-f4e3-4558-8855-c920d066f3f6", label: "Razzy Lee" },
  { value: "185b6af5-810e-4f81-8d4c-764300b7c2aa", label: "Reason for Pawz" },
  {
    value: "cd6e9b4f-9f5c-4347-ac44-626d33e3cd23",
    label: "Red Diamond Creations"
  },
  { value: "0b0d47de-9def-4eee-bfaf-156845a0289d", label: "Red Hyena" },
  { value: "9b1e2f22-4d54-4912-8d6a-552a6bc686af", label: "Redstorm Fursuits" },
  {
    value: "532b6f90-b605-46cb-9da1-58634acbf09e",
    label: "Regal Wolf Studios"
  },
  {
    value: "c9d0c973-36b7-43b0-af2b-1ef1e9ea796d",
    label: "Resurrecting Creatures"
  },
  {
    value: "3e3120ca-18cb-4d8c-9560-37de0633b22c",
    label: "Reveille D'Giovanetti"
  },
  { value: "c0076bbf-87ad-4d4c-8160-73b30086cdfe", label: "Rex" },
  { value: "867c7094-5902-4a8c-97e8-f0615e8beb58", label: "Rhee" },
  { value: "a3459e28-5ded-47df-97ed-224876989bea", label: "Rhys Ookami" },
  { value: "b424f51c-d0fe-40d2-ae8e-1599c6661bda", label: "Ritz Costumes" },
  { value: "5ec6bd62-e0ca-455f-818b-ecbe6a651da6", label: "Roofur" },
  { value: "f1eef11a-4c24-418f-b42d-b11668064ffe", label: "RooSuits" },
  { value: "e1fb606f-6ab4-4dfd-b0fe-cd138cbed832", label: "Rosequoll" },
  {
    value: "ba5d7c79-fde2-41e9-a1af-88588285e4b2",
    label: "Rossykitti Kreations"
  },
  { value: "3b65f78c-85f6-49b2-ab2e-80f7cbc21b05", label: "Rowdy Monster" },
  {
    value: "ba37a490-eb5d-4844-a529-621dd291883f",
    label: "Ruff Stuff Costumes"
  },
  { value: "09f5f1e0-fd6c-4db1-9279-72a7af647634", label: "Ruffled Designs" },
  { value: "7b508223-0995-4528-a5d4-28ec1b3ce6c8", label: "Rum Wolf Studios" },
  { value: "402e9483-a84a-4b98-9922-423c75367e66", label: "Runaway Workshop" },
  {
    value: "fb34fdf1-2de8-4932-9556-e86503011c96",
    label: "Running Wolf Productions"
  },
  { value: "fa071b23-143f-4e31-a718-0d56c74df951", label: "Runoratsu" },
  { value: "ea465844-93c0-4771-8dd1-1700adec841e", label: "Rust Rat" },
  { value: "12c8d32b-a8be-42f0-8d80-d2f1211ee486", label: "Ryoken" },
  { value: "7b491745-7a60-4589-ae6d-4ffb827e38ff", label: "Sabrinageek" },
  { value: "4b10b728-ab45-4210-b388-408418356ecd", label: "Saigo Zangetzu" },
  { value: "aa903e4c-ae05-4683-9926-4357a8cb14d2", label: "Salty Suits" },
  { value: "3e8d6683-d227-450a-91b7-adf8f1559578", label: "Salvo Sniper" },
  {
    value: "414f74ce-5757-4c36-ba48-f63770a52373",
    label: "Sammy Smiles Works"
  },
  {
    value: "b159ca88-19dd-4700-aeb7-adb266a87804",
    label: "Sammy's Fur Shoppe"
  },
  { value: "4e849347-e148-4f8c-9a55-7bbdfc4f9d14", label: "Sanctuary Suits" },
  { value: "2db45ffc-2f46-4d74-930e-d6de5eb91e3f", label: "Sarahcat" },
  { value: "1882c231-43c0-4eae-a34f-f25260418649", label: "Sasa Creations" },
  { value: "83463f03-f85f-4b02-a014-8ff8e4be1054", label: "Sashaligress" },
  {
    value: "f3cce154-2774-436f-8130-b2a52efc16b8",
    label: "Sassy Pup Creations"
  },
  {
    value: "9027c7fe-05c6-462c-a890-0bbbdd341f64",
    label: "Savage Turtle Studios"
  },
  { value: "3701d080-09c9-4e28-b007-5c194566051e", label: "Scardykat85" },
  {
    value: "68407e7e-2df6-4c53-a1b1-63cc4354ce72",
    label: "Schneepardi Creations"
  },
  { value: "4583d33a-16e5-49cc-ba38-359448738555", label: "Scratch Kitty" },
  {
    value: "f645de8a-3237-4c7b-8109-f0c8ead56b3d",
    label: "Scuddlebutt Creatures"
  },
  { value: "d49286f0-b84f-48f6-9781-7449752954ee", label: "Seadog Suits" },
  { value: "25fbe450-cf04-4b19-bc7f-5d88f81020d2", label: "SereStudios" },
  { value: "e0ee9304-2d22-4e5d-9cd6-0230e0913b4f", label: "Sewing-Critters" },
  { value: "5b6463a8-a2cf-440f-99e9-71c69eef923e", label: "Seylyn" },
  {
    value: "e615e55d-e371-45b2-92e3-a08f5bf527ba",
    label: "Shaggy Griffon Studios"
  },
  { value: "3f7d72c6-b3bb-4bdc-82ca-eeb56d6dbfe4", label: "Shagpoke Studios" },
  { value: "5b1ab008-5362-4987-aeb2-f1961e38c3db", label: "Sharkteefs" },
  { value: "6d983be8-9b5f-4467-97e2-29237f3c2d6e", label: "Sharpe Costumes" },
  { value: "fc8869ab-64a8-4b21-9d50-a5969ecdc27a", label: "Sheevee" },
  { value: "1d870b92-ff55-4b08-a2a6-6c233b731c6d", label: "Shengoh" },
  { value: "43802405-d407-400c-b655-c10d8c0ed6e7", label: "Shkaff" },
  {
    value: "c6dff549-5201-4672-b7df-b9c24787f5dc",
    label: "Shock Collar Studios"
  },
  {
    value: "f2c10800-bd2c-43c2-889c-f20f9d788b01",
    label: "Short Stack Studios"
  },
  { value: "dca041c9-e044-4c6e-8a46-a839e5c2db69", label: "Showreel Studios" },
  { value: "85ad61d8-fc09-46c7-b081-c6b2828a9d7c", label: "Shuntorizzy" },
  { value: "fd868794-7aad-4e44-bda6-5e6882d8ac37", label: "Silent Howl" },
  { value: "8d459a72-5915-4bbd-aa12-7263e17e1fe6", label: "Silvena Handmade" },
  { value: "e97c3d59-89ba-40ce-8975-62d2bf030348", label: "Silver Sky Studio" },
  { value: "29bde669-dfc6-4061-8942-51698d44f298", label: "Silverfang" },
  {
    value: "f2da6e39-4693-4a9b-9a1d-60228e1f8dc0",
    label: "Sironafur Creations"
  },
  { value: "3bde334a-c468-42a1-a679-578e4a2867a9", label: "Skookum" },
  { value: "6821f425-e4bb-4d4e-9e49-19a356476905", label: "Sky Hawk Cosplay" },
  { value: "ed820b41-4f76-4c52-818d-5342e56dcb3b", label: "Skyehigh Studios" },
  { value: "8c9aaec6-bf45-46bd-bcb0-e5dda0999030", label: "Skypro Costumes" },
  { value: "4c3d0950-619b-4698-9618-63c5878e3c9c", label: "Slap Happy Bunny" },
  { value: "d6bff9c3-f2ef-4c95-a14c-5baa6a642976", label: "SmolShepSuits" },
  { value: "1c22a822-5063-4108-8dbe-b1c491ec4aa7", label: "Snow Covered Yote" },
  {
    value: "ac24cafe-6c84-42c5-88e4-668648381cbd",
    label: "Snow Gryphon Suits"
  },
  {
    value: "4ac52562-ba4c-48ff-b6d5-fcc28722da5b",
    label: "Snow Leopard Creations"
  },
  { value: "9eb97b8a-6158-4d47-88f0-7530e46ba587", label: "Soapdish" },
  { value: "39b664b5-b036-4131-aa4d-9fc26699d674", label: "Solemn Vulpine" },
  { value: "13ac5744-e7fe-4854-87d3-d3c02b2920a4", label: "Sonartoo" },
  {
    value: "5dab281c-bb4b-4a6f-93b9-b305bd1918ba",
    label: "Soul Bound Fursuits"
  },
  { value: "76511033-76d6-4a75-8753-91af4ac352bc", label: "Soul Creations" },
  {
    value: "5236fb73-8f14-40c2-88c9-4059727160f8",
    label: "Space Cat Creations"
  },
  { value: "abea37ce-1029-4e0f-912c-14770e08a925", label: "SPark Costuming" },
  { value: "e7bfaba8-d8c2-417e-9361-59d2380ca816", label: "Spark Studios" },
  { value: "7bdcd4fa-e39d-4651-9a42-49989b06a5c4", label: "Sparkle Kreations" },
  {
    value: "c189be7a-16d3-4309-b39c-2231bbc36adf",
    label: "Sparklepup Studios"
  },
  { value: "6f3316ee-c737-4a8f-a4e3-a5f3b812124f", label: "SparkyCanDo" },
  { value: "a3c1f251-a873-4105-9db7-dfd190edc5cc", label: "Sparkyena" },
  {
    value: "82d511a1-2d4d-4772-b820-291647021dec",
    label: "Speckled Blue Nose"
  },
  { value: "1d0903f3-4eaa-4dff-87cd-7dde7bd841ba", label: "Speckled Studios" },
  { value: "15dbae35-023c-469c-bb0c-2168e5f5c4a9", label: "Spinfox" },
  {
    value: "772c1a9c-ad3a-475d-a1f5-f55f3a506a6d",
    label: "SpiritPanda Creature Cosplay and Costumes"
  },
  {
    value: "49b1aab8-d608-4eed-a0f2-860dcb58bba4",
    label: "Spit and Ink Studios"
  },
  {
    value: "f92cc329-7fbd-4a91-a21a-ab259014ab3f",
    label: "Splinter Fox Productions"
  },
  { value: "8af33d49-3d22-41cc-9136-7a6ae81c675e", label: "SplootSuits" },
  {
    value: "4a7cc83b-de29-444b-982e-3bb875ecb6d7",
    label: "Spotty Productions"
  },
  { value: "9a46ec50-abf2-4b21-b99d-032ce20b06da", label: "Spud Studios" },
  { value: "2e246c05-8d94-436b-9e13-0090d216cebb", label: "Squeaky Chewtoy" },
  {
    value: "17087845-a1fc-4977-82e4-affea9365391",
    label: "Star Candy Creations"
  },
  { value: "8cc18db8-4c26-441f-9e16-b85e477e939e", label: "Star Fursuits" },
  { value: "d8a9b029-426f-4982-9dee-a860e2c12a7f", label: "Starparty" },
  { value: "b2edf783-6844-4e0c-9081-00ae0c91dc1a", label: "Starry Kitsune" },
  { value: "1caf7221-302c-4056-8a38-1b828e704874", label: "Starslikeroses" },
  { value: "980d13e7-5d70-4a0b-8c57-a49df7e672c6", label: "Steel the Wolf" },
  { value: "3c243c0b-609b-4476-a2aa-d25dbc47e456", label: "Stickypawz Studio" },
  { value: "a6864a67-1fda-4ad5-ab7f-961e02bd87fd", label: "Stitchit Studios" },
  {
    value: "fa58973c-765d-4eb1-80b9-0c3aeac8e748",
    label: "Stitch Star Fursuits"
  },
  { value: "bf8ddf47-e0f5-4a2f-bd96-8af707e8ab9f", label: "Stone Studios" },
  {
    value: "f4438187-1f75-4be6-a9bd-9838adc3297e",
    label: "Storm Wolf Creations"
  },
  {
    value: "6932c5e8-d3ad-4ea4-a57c-c330a20062ab",
    label: "Stormy Fluff Creations"
  },
  {
    value: "a26d155b-6568-4eb3-af5e-2dd1318fcee7",
    label: "Streifenschnauzer Fursuits"
  },
  { value: "d0b37041-82d3-4990-8341-480d536190f0", label: "Studio Delights" },
  { value: "c0d5ee2b-4902-4dec-ace7-9c906f993438", label: "Studio Neko" },
  { value: "1ed0142b-e1a6-4a58-8990-3fad88a0039e", label: "Studio Pinali" },
  {
    value: "f9f13076-aacf-48cc-9e8a-15be509e0105",
    label: "Stuffed Panda Studios"
  },
  { value: "4911d4fb-0078-42d6-a66d-f3fb024adf17", label: "SueCreations" },
  {
    value: "47dd5666-ffbd-40d1-a17b-60994cc7c1e4",
    label: "Sugar Critter Studios"
  },
  {
    value: "4ba3228c-a616-4bd4-a95e-57d14db26700",
    label: "SugarNSpiceCostumes"
  },
  {
    value: "057fd879-e819-45b4-8d78-c9b382b00833",
    label: "Sugarrush Creations"
  },
  { value: "20abcbe7-96c8-4f9d-92d1-004c20d0dd8a", label: "Suit-a-dile" },
  { value: "b18992f5-92e3-4731-9cfa-0121e6f6fcee", label: "Suits by Shark" },
  {
    value: "1bd0ae49-a70c-4924-b9a1-13ff57100377",
    label: "Sun & Moon Creations"
  },
  {
    value: "b30d40be-da9f-401a-9950-144f07a5c485",
    label: "Sunny Valley Creations"
  },
  { value: "8e1bc256-52b3-43d5-9375-1ac1fe7a1805", label: "Surf Cat Costumes" },
  { value: "c6c2fa88-9b01-41dc-955b-9990b2463990", label: "Sushi Suits" },
  { value: "9126948d-1205-4fc3-8790-3399627b8501", label: "Sushimon Suits" },
  { value: "2b532c63-f26e-4054-8027-21a19656b486", label: "Sushinom Suits" },
  {
    value: "f05a83d8-7b5d-43e9-b536-7b9c466df06a",
    label: "Suzamuri Creations"
  },
  {
    value: "3347b470-fef5-4ddd-9e18-ec75a142a233",
    label: "Sweentastic Productions"
  },
  {
    value: "5666b0f0-8b01-4761-88c2-9e7c7b2ba454",
    label: "Sweet and Salty Suits"
  },
  { value: "6772e965-79bc-48a8-90e1-87c432f846db", label: "SweetSushi" },
  { value: "db7e560f-6f4d-47ad-9b16-b228352949c1", label: "Sylfur" },
  { value: "cc2d88b0-f4e6-4bcf-959f-c227e6209f68", label: "Synthwolf" },
  { value: "f73e7451-bb94-46a7-9b05-f97ebff0272b", label: "Tabulambestias" },
  { value: "753ef110-f2da-42f1-a2e1-6f11d2cb543e", label: "Taffka" },
  { value: "f04b1db9-162b-400c-a8a9-144a3e387f8b", label: "Tailin" },
  { value: "dd93855f-5410-4826-a28c-1a7e28a817ae", label: "Tails Time" },
  { value: "ed5220fd-4425-4743-9e54-c94609a03431", label: "Takumori" },
  { value: "896cfe1e-f345-4a63-977a-3784950da3c9", label: "Talarus" },
  { value: "a7e34cb0-36ee-4954-a4b5-2bf3a9d9962c", label: "Tanidareal" },
  { value: "ade395b0-6348-4d2e-bb1a-53a5a308b5ac", label: "Tapapat Creations" },
  { value: "cd66ce8c-f088-4546-9b1d-45f18ef5d1b1", label: "Taybee Fursuits" },
  {
    value: "99f4f224-06c7-401c-9515-5fe4ca273543",
    label: "Technicolour Costumes"
  },
  { value: "90bad4c8-76bd-494d-861f-d04e6dc1ec38", label: "Templa Creations" },
  { value: "962fda5a-5d1e-467a-b7d2-de8660b9a06e", label: "Tesyra Creations" },
  { value: "3856aec2-95ad-4e7a-a734-9b2e54c17384", label: "That's Furred Up" },
  {
    value: "37d5f121-2347-45f9-83ed-25e5659a25bf",
    label: "The Corrupted Furries"
  },
  {
    value: "a4e8aaf6-2592-45ab-ac4e-53a201ec75fc",
    label: "The Critter Factory"
  },
  { value: "70e3112a-9cc2-4aa2-a6dd-96b9d2c16a0a", label: "The Curry Mouse" },
  {
    value: "27877828-afb0-417e-b8ee-a4c2a3089fa7",
    label: "The Frozen Phoenix"
  },
  {
    value: "ab44fe61-b26d-469a-9c1a-67da18376ccb",
    label: "The Fur Collective"
  },
  { value: "caffb3c3-e2ba-4d2f-8b1e-cfe911c4dfbb", label: "The Fuzz Factory" },
  {
    value: "6f404320-5b30-4c5e-984c-8248aa3ad992",
    label: "The Grotto Creations"
  },
  {
    value: "c369ba88-7568-4f26-aecc-661c22f23721",
    label: "The Karelia Fursuits"
  },
  {
    value: "298f5ec8-93a6-4a8a-86b5-548bc724b04e",
    label: "The Menagerie Costumes"
  },
  {
    value: "385cced2-e93f-4b2c-9279-034f585a9f9c",
    label: "The Other Side of Us"
  },
  { value: "549ec157-6c64-46c0-af8c-2caf4550cfc1", label: "The Phoenix Nest" },
  { value: "304c4126-e9ba-4b91-9bc9-3c25e26a70ee", label: "The Sable Kitty" },
  {
    value: "f049bc8a-1984-4582-9938-a4bf4461c4aa",
    label: "The Woodland Tailor"
  },
  { value: "218b4d88-1644-4bfb-a844-3d84bf3414b1", label: "Thirteen Diamonds" },
  { value: "57c801ee-29d4-4f45-badb-bfbfdd253404", label: "Thrash" },
  {
    value: "d73fe27d-de4c-438a-a465-b342bcae172a",
    label: "Thunderhowl Studios"
  },
  { value: "2591cce5-4bc7-47c3-8c6b-ae2a62a204f9", label: "Thursday2U" },
  {
    value: "2b090512-4c10-4a36-ad2c-c0c983610a3c",
    label: "Ticklish Tentacle Studio"
  },
  { value: "d8685bfd-ac68-4805-9019-1048ccac0b58", label: "Tiggcreations" },
  { value: "2d0405de-878d-477b-91a2-079a1067a8f4", label: "Tiggy Workz" },
  { value: "29ea4586-397f-4781-90dd-4233704c80ab", label: "Tiny1Badger" },
  { value: "4dafe5b0-bb98-460e-b9ea-0364e23040e7", label: "Tioh" },
  { value: "28c03ecd-0869-493e-a6bd-0dbf595f8bf2", label: "Toffeee" },
  { value: "fc6a2770-0ff1-415e-b3d3-3383c44035f4", label: "Tokai Suiting" },
  {
    value: "fa659d3a-8790-4dc7-95ce-ce0a1dfe1a0e",
    label: "Tokyo Rampage Suits"
  },
  { value: "d7af3559-f636-404e-ae10-dd0ad5dc64eb", label: "Toxic Fursuits" },
  { value: "e240c337-4ebf-48e5-86d7-e41645f408c7", label: "Tribal Works" },
  { value: "697c89de-d3ce-4f67-b18c-0b41159781ca", label: "Tsebresos" },
  { value: "1a8b61b5-bc30-4bb9-b73f-25bda27d0660", label: "TunnySaysIDK" },
  { value: "e3150c97-036d-4e76-9010-8c081006a683", label: "TV_Thari" },
  { value: "e0ec72da-a688-476d-a12c-d99c07f6e396", label: "Twinky Arts" },
  {
    value: "96d586fd-32b5-479e-9c7c-93724f3095c3",
    label: "Two Faced Creations"
  },
  {
    value: "92649c75-a3d3-4e11-bff4-734df0fc9320",
    label: "Two Tails Enterprises"
  },
  { value: "c2eeb170-3c05-4dc1-bab9-bcdbbaa811b9", label: "Two Wet Noses" },
  { value: "ee8d3707-b4f1-4680-bc79-aa8200dfce4a", label: "Uchihafox" },
  { value: "405ce99e-7116-46f6-886a-1a9d5e2b95d4", label: "Ugly Puppy" },
  {
    value: "2631c1c0-bd43-401e-9961-4570d15cac77",
    label: "Ugolek Fursuit Studio"
  },
  { value: "a6e11ee0-dedd-4bd1-9049-c389709bccb6", label: "Untamed Fur" },
  { value: "c9c92ca4-5240-44ca-8a79-cde5b28c9ad0", label: "Uren Husky" },
  { value: "ee4b55f2-8267-4de0-8e08-bcc02aa02930", label: "Valdyr" },
  { value: "14336120-2836-41c7-9124-ef7dc91947ad", label: "Vegasyote" },
  { value: "44634b68-ac11-4943-b039-6a8277cb1436", label: "Velkss" },
  { value: "24995e80-005c-42c4-a890-ea35fe4cce41", label: "Velveteen Soldier" },
  { value: "8b5607d8-a8c3-461d-a185-af0ee6ac8e41", label: "Vixens Creations" },
  {
    value: "e5f70e4e-f3fa-4113-89d5-690e6eec59f9",
    label: "Voxal Visions Fursuits"
  },
  { value: "0ebf837c-cb5a-4f28-a60f-7a1355323c48", label: "Wanderlust Suits" },
  { value: "6044f45c-1a8f-40e6-b897-6254a38d4d48", label: "Water Dog Wharf" },
  { value: "921c6dc3-46ce-4e3d-a47d-f8bfec31db3c", label: "We Might Bite" },
  { value: "d847295e-ed39-4034-829f-efb0a3dc9620", label: "Weasel Crafts" },
  { value: "bcb66de1-180f-44f7-948a-cd43abf18e66", label: "Weasels on Easels" },
  { value: "c69f90ef-4947-4593-859a-39332ad73d1d", label: "West Wind Howling" },
  { value: "e389103c-f72a-4c15-8b6f-e49c0276a25b", label: "Whaleosaur Suits" },
  { value: "efb1ae7f-54f9-4b2d-bb6d-6928f410ef7e", label: "What The Fluff" },
  { value: "1a5baa1c-4644-4e31-9f8d-3dae620d2399", label: "What's Up Hot Dog" },
  {
    value: "9ff5576a-46ef-48bd-b7d3-decf3de87fed",
    label: "White Wolf Creations"
  },
  { value: "677db7ed-cea5-4aa1-b3b7-649fe87c9965", label: "Why I Otter" },
  { value: "ba76b75d-5d78-4c0e-8351-2d1e76956b33", label: "Wild Fuzz Studios" },
  { value: "a42615c3-b34c-4c02-8603-35376b893ac4", label: "Wildlife" },
  { value: "3c41a5f3-1a3c-44d8-bada-4fa422ae6214", label: "Wildspotworks" },
  { value: "590dd5ad-e61c-4c56-9606-7bc79bfa7e74", label: "Wildvskings" },
  { value: "c33d45e6-9dfe-40b2-8ef1-0ecb1b51fd9d", label: "Wildwolf" },
  { value: "af928919-d017-4dee-af83-90ad45703522", label: "Willow Creative" },
  { value: "6cfbd3bd-e46e-4455-b0b8-3554613f0438", label: "Windy Fursuits" },
  { value: "9e3c6ee6-8017-480d-8c59-3a5809da55c3", label: "Winfox" },
  {
    value: "37910dc6-5236-4785-a2b7-c957355bcb95",
    label: "Wingwolf Creations"
  },
  { value: "c00ecec9-8829-40e6-a4c6-e5c5ab23819e", label: "WMW66 Costumes" },
  { value: "11db3683-baa3-4a37-b30b-bc3866277341", label: "Wolfskin Suiting" },
  { value: "4c95e63f-4038-47d6-8770-3b529b2bd655", label: "Wolfwood72" },
  { value: "77c9c035-4f6a-4227-b8a3-41c0a6a0d44c", label: "Woltirr" },
  { value: "92766714-7046-4d28-9adc-2ea23c943bf5", label: "Woozles-Wonders" },
  { value: "89918b6f-ec0a-4cc2-9f0e-ff2192965783", label: "WorldConColor" },
  { value: "108546b4-d4ca-425b-9006-f183ce669f8d", label: "Xaria Wolf" },
  { value: "b2bd5636-efaa-4be7-bc1b-d1d7a75645c5", label: "Xianniecho" },
  {
    value: "b987d1d0-9d69-4cd9-a226-df8563215232",
    label: "Ya Boy Luke Fursuits"
  },
  {
    value: "0f39c755-fb87-47ce-a520-61beefded162",
    label: "Yette Helin Studio"
  },
  { value: "11ed65d8-2a92-45cd-80bb-4744eb26dce1", label: "Yoshinomi" },
  { value: "89e7b4a6-904d-453b-b835-b3b5216a957e", label: "Yu Puffin" },
  {
    value: "c4338624-efa9-4b15-8e06-506978d0bccc",
    label: "Z Cube Fursuit Studio"
  },
  { value: "36fac3e7-7aab-48c6-abbd-42452a81f115", label: "Zagone Studios" },
  { value: "ead647dc-9fe5-4eee-815a-a3e8a9158be1", label: "Zarathus" },
  { value: "7b3e2ab3-f37f-44dc-b047-6347ab03c8cc", label: "Zee-The-Dingo" },
  { value: "3b7fa87a-d70b-4e77-a171-734e1e1019c1", label: "ZombieHorse" },
  { value: "7cedf8d3-748f-4810-8f8f-b430c94a9276", label: "ZooAbsurd" },
  { value: "fd90ddc6-2f08-4301-ad86-8622de2d7c84", label: "Zuri Studios" },
  { value: "6a7009f4-506f-4d13-8ac8-484f8b35452c", label: "Zurya Creations" },
  { value: "f3c8d627-6cff-46ac-882e-e6f982d65587", label: "Zuzufur" }
];

export { makersList };
