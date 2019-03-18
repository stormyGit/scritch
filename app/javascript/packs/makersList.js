const makersList = [
  { value: "0bd28007-cc81-4662-bf8f-b98ef6bdeaed", label: "2 Stupid Furs" },
  { value: "c7e93600-bb84-4def-b8e4-ba19fdbd6134", label: "79th Element" },
  { value: "84a22ca4-02a7-4806-b950-9e9bdf85db63", label: "8 Foot Rabbit" },
  { value: "ff7a1c6b-d54e-449c-b9d5-671104e2cd1d", label: "8AM" },
  { value: "1ab35ded-1698-42bf-8c05-3a4434951a9e", label: "8Bit-Works" },
  { value: "cf2a5787-f7bf-4d21-a457-db78467a9270", label: "A Ginger's Suits" },
  { value: "1a1aa821-b235-4e4e-8ac0-db5784be13ef", label: "Admirals Costumes" },
  { value: "842ab7a7-17b7-423a-ab03-f6f9c578ee05", label: "Adorable Foxie" },
  { value: "0108c191-23df-462e-8e36-7af828b19198", label: "Ajax Suitengu" },
  { value: "c184625d-bb58-4d59-a1d5-5810a7f40336", label: "Akorn Studios" },
  { value: "1a988ce8-d9c3-456b-b7d1-6ec3585b333a", label: "Al Bird" },
  { value: "22cee176-1cb9-4d0f-b9b2-9605b4b79cbe", label: "Albrecht" },
  {
    value: "d1b5b474-a4f0-4b25-9f33-7ba74953b1a2",
    label: "Alien Eyes Creations"
  },
  { value: "113a2a9b-ec8b-4e9a-9a7e-04b9a2239f3c", label: "Alinchen Fursuits" },
  { value: "7d4b1be8-217a-4c1d-a372-2548046ca808", label: "Alinco Costumes" },
  { value: "f3ee63a3-7e20-4bf9-a079-601eca7704a9", label: "Alpha Dogs" },
  { value: "b3a08e0c-f073-4501-a235-994b3919fe83", label: "Alpha Suits" },
  { value: "57075b9a-0c3b-40d7-ba63-2cd33f473a99", label: "Amber Groves" },
  { value: "b2689f16-1205-4d45-a53e-3062a9ed1dfb", label: "Amoryllis Studios" },
  { value: "fce5bcd7-c31c-48cd-9db8-d04746f44e7f", label: "Andy Oagara" },
  { value: "aea8d393-da03-41ee-adfb-24c0d0bfe903", label: "Angel Tigress" },
  { value: "51fc1a55-008b-449f-bc52-d61387cdb2a6", label: "AngelDragon5" },
  { value: "42718430-1857-414e-b08f-dc66a4ed1575", label: "Angry Red Fox" },
  { value: "77f859f0-8936-414e-85f5-0f29dbc621a3", label: "AnnikaCat" },
  { value: "984c5f81-c50f-4c23-8d0d-b85051f8f3c4", label: "Anthropaws" },
  { value: "b7cbd45f-0d79-48ac-8e35-5869d92792e0", label: "Aoi Kitsune" },
  { value: "987a3830-f121-4c8c-926a-bfc116ce5f05", label: "Apoxon" },
  {
    value: "a9fef6d5-b897-4e77-b132-b3ccc383d309",
    label: "Appalachian Fursuits"
  },
  {
    value: "5f71c04f-75e7-4213-b61a-53c574b9cb23",
    label: "Apple Monster Studios"
  },
  { value: "0ab0aed7-0ddf-42e7-8790-a78add90555f", label: "Aqua Frost" },
  { value: "a39ff5c2-5244-47dc-8be6-1d55f508c637", label: "Arend Studios" },
  { value: "9b7ca30d-f46a-4db2-a75c-079d8e8c4f6d", label: "Arito" },
  { value: "be8d904e-d3ff-4779-b042-f172e2471bca", label: "ARocco Suits" },
  {
    value: "df7066b2-228b-47f9-9f37-69d880b6b4dc",
    label: "Around the Fur Studios"
  },
  { value: "13f7f089-526b-461b-b673-1d91aca8c096", label: "Artemis Bobcat" },
  { value: "93b30bff-20db-429b-af60-d14ff662b1ea", label: "ArtKour" },
  { value: "46fe0ddd-0ed5-4b99-89f7-a7ab1ba26435", label: "Artslave" },
  { value: "b79d1070-ebc0-45e7-bdda-cd1157b4416e", label: "Arzhurenn" },
  { value: "cea70c7b-97eb-4036-ae33-8689796b2584", label: "Astro Antlers" },
  { value: "de65fe58-69af-4383-91a5-e2e7ac51de5f", label: "Atalon Deer" },
  { value: "058a75eb-2f85-46c5-8816-20af4dc94dc7", label: "Aheun Fursuit" },
  { value: "ffb8bf49-e796-4257-b1bd-a4be51b0bff1", label: "AtmosFur" },
  { value: "d092c0a7-1c3d-4ef0-8813-f79860df6446", label: "Autumn Fallings" },
  { value: "982b94b1-fc48-445a-b0af-17cf99634c8c", label: "Av0salt" },
  { value: "9eb39420-6e3e-4275-a3a9-a0a707fe9794", label: "Avsun Mascots" },
  { value: "60c6dfc3-f65f-4a6c-a6ea-93fd32d2e3c7", label: "Azflip" },
  {
    value: "25edb11d-2047-4a0b-82a5-76044e35ffe0",
    label: "Azure Coyote Studios"
  },
  { value: "af3c1d2e-9bb7-4766-a26a-d77d87838cec", label: "B3 Mascots" },
  { value: "7889cb65-c2c6-467a-8a6f-29ad3af4e681", label: "Bad Doge Suits" },
  {
    value: "3b86c601-d5d7-4bd1-8025-df0d4430fc63",
    label: "Barking Mad! Suits"
  },
  { value: "b66c7e2f-0061-434c-aa70-2a7ceb460069", label: "Bat Cat Suits" },
  { value: "058a438a-7f80-44ec-9fa6-d09f08be49cc", label: "Battitude Studios" },
  {
    value: "511837b3-8ca9-490c-b2a6-f5b7bc4a2543",
    label: "Beast Makers Fursuits"
  },
  {
    value: "22f9502a-5fed-4892-b46a-e993a5a567ea",
    label: "Beastcub Creations"
  },
  {
    value: "08d108b9-106c-431d-8d85-be0e86ebb16d",
    label: "Beauty of the Bass"
  },
  {
    value: "1916b1e9-3f2d-408d-afbe-a5f337f334f9",
    label: "Beetlecat Originals"
  },
  { value: "a1b152d3-f39a-4de2-bd99-23d594aed548", label: "Benzene6" },
  { value: "f80f2622-8619-4642-a948-f70db0de70f6", label: "Beta Raptor" },
  { value: "3b0d7041-4ad2-459e-914c-f7857a24d8e0", label: "Big Jaw Costumes" },
  {
    value: "ec814f11-01a0-45f8-a86e-37c5c49d2d38",
    label: "Bio Pelt Productions"
  },
  {
    value: "d7a0c09c-7220-4503-998c-8b74b69a954b",
    label: "Bird King Creations"
  },
  { value: "64b5f658-cf44-45b9-af71-0d96070fd371", label: "Birty Creations" },
  { value: "0783e424-ae3e-4dea-9a47-6a614adb27c7", label: "Black Back Studio" },
  {
    value: "fd9df22a-6fb8-40d3-b4e0-5835df85a58f",
    label: "Black Lion Designs"
  },
  { value: "1503a6be-e05b-4c0c-8cc9-b8b8908428df", label: "Blix Fox Fursuits" },
  { value: "89f3ff66-a562-443e-aeb0-b14d7a4d3405", label: "Blue Canary" },
  { value: "882d6dd8-ced0-4593-96d5-9f3137192e82", label: "Blue Fox Fursuits" },
  {
    value: "f5b02041-d657-4e9b-b3f0-b855af02857c",
    label: "Blue Harbor Mascots"
  },
  {
    value: "87b6f445-fe78-42ea-b42f-2a887ca9fcf1",
    label: "Blue or Bust Fursuits"
  },
  {
    value: "390662cc-489c-4f52-824a-caa69b0faa1c",
    label: "Blue Rabbit Studios"
  },
  { value: "1c668e15-c777-46a4-8565-cf0678870743", label: "BNC Costumes" },
  { value: "e1803075-bf2b-403a-a169-f9cbdab3c948", label: "Bongo Queen" },
  { value: "2357cb9e-72b7-469e-9cb0-172e3a740482", label: "Bouncy Bat Works" },
  { value: "a93856b1-841d-41da-9c6a-5de4aa92f537", label: "Brek Wolf" },
  {
    value: "79a196d1-5a97-400b-bb3a-35a003b19eda",
    label: "Brush Wolf Studios"
  },
  {
    value: "f8660a0d-305a-4df6-b03c-24ff6986f99f",
    label: "Builder Bear Studios"
  },
  { value: "92f59cb6-e140-4aad-a6a5-49899b785c82", label: "Buppa Spirit Wolf" },
  {
    value: "23b74b30-9b0e-4698-8749-6d8c2a5b7f37",
    label: "Butterfly Back Fursuits"
  },
  { value: "3c82458a-4ba7-493d-bb53-b87d0b9066de", label: "By Bunny Fursuits" },
  { value: "a7687039-4244-42c8-b37c-0d89ecd58c55", label: "ByCats4Cats" },
  { value: "1a89a1e7-3299-4e83-a295-da2add2a8ac3", label: "Toffeee" },
  { value: "f213c9aa-a3ca-4087-9d87-18dd41a170cc", label: "Cabbits Co." },
  {
    value: "1def6b93-a09b-48e0-b453-0502d2b1132c",
    label: "Calico Cougar Studios"
  },
  { value: "8671b148-59d0-4ce3-9f4f-e3e0633ad86b", label: "Calypsonight" },
  { value: "5d0591df-6590-4bee-91a0-6901096c3402", label: "Candi Fursuits" },
  { value: "195dff9b-d9f0-4584-ab5e-63092bdf795c", label: "Candyxdog" },
  {
    value: "78a6df69-93dd-4142-bc24-2158675b56dd",
    label: "Canine Hybrid Creations"
  },
  { value: "0726790c-ba30-4a0d-9f2c-a4338461a88e", label: "Cant of Togs" },
  {
    value: "2e412630-254a-41ab-a13d-9288226b46ec",
    label: "Carmal Coffee Fursuits"
  },
  { value: "fac9b3d7-842d-4317-a44d-268d81b6f9bd", label: "Carolina Critters" },
  { value: "6ddf4416-e180-464b-b9e4-35432988ce27", label: "Cassius Crafts" },
  { value: "46e02f09-91d5-47eb-a734-28c658744f1c", label: "Cat and Cockatoo" },
  { value: "9441ec74-5def-4f7a-8c6e-2d6b6fb47c24", label: "Cat Tails Up" },
  { value: "b8bc3e9b-9ae1-4027-b093-eac818401dfb", label: "Cawstumes" },
  { value: "8b4fee2f-29ea-4b12-bb3a-d6e9db9caf27", label: "CCS Mascots" },
  { value: "1eb44d1a-ca91-4964-965d-264956db6368", label: "Cenobear" },
  { value: "7ab5fde8-1aab-4d56-8028-ccbae672b004", label: "CFStudios" },
  { value: "5465cf85-8272-47d7-a383-e4614427d83a", label: "Chairo" },
  {
    value: "512a6017-c5e7-4c84-b126-ce1ccc3a6127",
    label: "Constellation Creations"
  },
  { value: "fd471222-6c75-4a87-a3bd-89701280e8c9", label: "Chibemo" },
  { value: "c4a191f0-51eb-4163-80a3-a3f6c472733f", label: "Chibi Marrow" },
  { value: "c36d7ffa-946a-483d-af10-b801d7779036", label: "Chilifoo" },
  { value: "08a0fee2-abfc-4a7d-ab1b-dc05d14481a2", label: "Chiyo Fursuiting" },
  { value: "a4f17f13-0959-44d1-9aab-cd6ec9e9ad76", label: "Chunksta" },
  {
    value: "92b54ec6-feda-423f-874d-3347da22ea08",
    label: "Cinnamon Rabbit Creations"
  },
  { value: "fa9c3d31-f908-4523-8d5c-eb3d9019b51e", label: "Circle Bird Works" },
  {
    value: "af7529bf-f0fe-4ddd-a6e0-ed90b8ab2bd1",
    label: "City Mutt Fursuits"
  },
  {
    value: "a114f2e2-5978-486d-b5c7-e1e83c8e6aad",
    label: "Clawsome Creations"
  },
  {
    value: "d5c2c7a7-d905-4ef3-85b6-9a6ab82a1cf2",
    label: "Clip Point Creations"
  },
  { value: "b4fd9a5f-58bb-4540-9551-293e2cbb53d5", label: "Clock Struck One" },
  {
    value: "58744dbe-5ac4-4aa1-bc23-7b1c9e405209",
    label: "Clockwork Carousel"
  },
  {
    value: "4da036a1-3334-4c7b-8502-37fe8633f39e",
    label: "Clockwork Creatures"
  },
  { value: "ce121e5a-384a-4af3-9a2f-056ba9292d27", label: "Coby Fursuits" },
  { value: "f52032d0-80f4-4b45-b1ec-7dd31fcbee9e", label: "Coffee Costumes" },
  {
    value: "e46fb780-e002-4a73-8889-46a837a429c0",
    label: "Coffee Kitty Studio"
  },
  {
    value: "47cb5ee4-4e55-434a-92cd-23f5daff4dfd",
    label: "Colorful Creatures"
  },
  { value: "fc3aaab9-e08b-4d5a-90d2-1af037d4cafd", label: "ConiFURous" },
  { value: "8e1e4a40-f170-4b1e-921e-e6cff5a9d774", label: "Coonec Creations" },
  { value: "2362ee4b-0304-4f06-b4fb-e47687c37879", label: "Cosplay Dawn" },
  { value: "d468ecbb-cf13-42a7-8af5-795684647631", label: "Cowan Costumes" },
  {
    value: "5c076e13-0249-4135-bddc-a92af9d6a092",
    label: "Crafty Coyo Costumes"
  },
  { value: "97ee2806-87d8-4d29-948c-42ac813790bb", label: "Crafty Critters" },
  { value: "3a5475bc-d770-4cc0-a895-ef99716ef8c6", label: "Crafty Husky" },
  { value: "8fbe0e3c-7b43-44b0-9502-9792d62a22e5", label: "Craftypillar" },
  { value: "cb84eb4f-1ee2-4789-aaf4-3efd5115f4df", label: "Crazi Corgi" },
  {
    value: "f8015019-74ff-4edf-ae07-0ae4870a1cb9",
    label: "Creation by LadyNightlight"
  },
  { value: "fdc899fd-9336-4d3e-a8ea-797abe353e45", label: "Creative Mochi" },
  { value: "2aa071b8-c9f2-4600-b32d-0264fa202ed7", label: "Creature Haven" },
  { value: "054b9825-64c2-4820-bf3b-e06c34b6f448", label: "Creatury" },
  { value: "c03707fa-02fc-42bc-85b0-297b61c8d0f3", label: "Cross the Fur" },
  {
    value: "99b648ae-3493-44b3-86ce-415adaa35dc3",
    label: "Crystal Cat Fursuits"
  },
  { value: "f19f91bf-3fc2-433c-b7b6-b7ec5818fd7d", label: "Crystumes" },
  {
    value: "45078754-ca52-49cb-a59e-43a68fe94f9f",
    label: "Curiosity Created the Cat"
  },
  { value: "be09a765-4c9b-4d4a-a100-9df126b60609", label: "Curious Creatures" },
  {
    value: "8b19e2b0-2a68-484c-aab8-e40451794d73",
    label: "Curious Tabby Studios"
  },
  { value: "88ff5c17-0e67-4c5b-a7be-fcd8580ce596", label: "Cursed Creations" },
  { value: "b45e1408-f155-4c21-97d0-05ecaa77c8c5", label: "CuttleB0ne" },
  {
    value: "ce905148-06c4-463e-bfe8-bf9bb5b5bb81",
    label: "Cwoodsdean Creations"
  },
  { value: "fc3ed000-1ad8-4f39-9ed5-58336fa963a2", label: "Cyon" },
  {
    value: "4d35528b-10ad-4dd8-afc8-26d386b5d229",
    label: "Dalmy Do Dat Creations"
  },
  {
    value: "36979073-8787-4242-a10a-abdaf29c2a92",
    label: "Dandelion Fursuits"
  },
  { value: "f5ef4999-4ab1-40df-9406-6c70f06a6434", label: "Dandy Designs" },
  { value: "2b36119e-0e64-43ba-9f46-38971ca3c491", label: "Dandylions LLC" },
  { value: "31e57fa1-590e-47e1-95d6-4e90db1c57de", label: "Dark Creations" },
  {
    value: "991d0d4a-bc20-401b-8c1c-95024c43e9fe",
    label: "Dark Rainbow Dragon"
  },
  { value: "4425c44d-a7e9-434f-8188-0686a8825f80", label: "Dead Dogma" },
  {
    value: "81baa714-e99e-4a92-92d0-d9450a162bc9",
    label: "Deadly Creations Fursuits"
  },
  { value: "a023e854-4611-4c04-8202-320b729b7f92", label: "Deathatsix" },
  {
    value: "b891ab75-729f-4620-a7fc-230eb46c9ec5",
    label: "Deer In A Hat Costumes"
  },
  { value: "d814e22f-2480-4bc3-b6c9-6337dc439cb4", label: "Deezlberries" },
  {
    value: "0ed0d682-04de-4ef7-9ce5-11de71a59425",
    label: "Defiant Tail Waggers Anonymous"
  },
  {
    value: "5647384b-c178-4ef1-9c99-93240ccf8855",
    label: "Delicious Disguises"
  },
  { value: "0e8aee75-639c-4033-89f7-5832a18949a2", label: "Dexterous Zombie" },
  { value: "5fe7edd0-598a-4344-ba59-e9fa02dc41be", label: "Diadexxus" },
  { value: "e8d8caa5-1cdd-4004-bb70-52eaf59d36dd", label: "Dingz" },
  { value: "e066e7cf-2bc6-425f-91db-bb650fd695d6", label: "Dire Creatures" },
  { value: "90fe76e5-68f6-4951-ada8-9b3eb6cc6fde", label: "Dolphyn" },
  { value: "ff0a24fb-e3b3-4fd2-9b49-b2f31f830678", label: "Dombrus" },
  { value: "d58ea381-7288-40b6-b0c2-12ff83c48021", label: "Don't Hug Cacti" },
  { value: "cbd4a130-3143-4598-97c1-d822b9b9bb09", label: "Dorky Dog Suits" },
  { value: "86d7e903-f1a5-4b1b-baea-a2d042649d95", label: "Dragon-X2" },
  {
    value: "24980123-f40b-4097-a253-2df230ff60b8",
    label: "Dragon's Grin Studios"
  },
  { value: "6c68ba5d-62d5-44c5-a412-98be6c79e6af", label: "Dragoncid" },
  {
    value: "9f8d7a6d-8e93-4430-acc6-89993c0aed30",
    label: "Dragonfire Costumes"
  },
  { value: "b51494a7-5026-4673-8be4-095340a37695", label: "Dragonfoxdemon" },
  {
    value: "19b06a01-c889-405f-a66a-caea7043a701",
    label: "Drakon Twins' Fursuits"
  },
  { value: "704a1373-027f-464c-bb16-04580a353ee0", label: "Drakonic Knight" },
  {
    value: "f1cec217-2851-4a36-b62f-b6edcc3ba60c",
    label: "Dream Machine Costumes"
  },
  {
    value: "4a69d9e3-23d0-47af-bf8b-153b70277501",
    label: "Dream Vision Creations"
  },
  {
    value: "701b4160-63cb-4403-8184-b7f6d44f8a20",
    label: "Dreams Come True Studios"
  },
  { value: "74f5e5ba-6d21-4f5e-9449-984300c86bee", label: "Dresden Complex" },
  { value: "2e1f0c7c-6ac5-4faf-9d68-72b15d7be4c9", label: "DTWA" },
  { value: "d146951d-1dec-4730-868c-43db130c5812", label: "Dubmutt" },
  {
    value: "6853e3c4-6aa5-4f90-86bd-ccee67b77df6",
    label: "Dynamic Cats Studio"
  },
  {
    value: "6312a835-3656-4f09-9363-2e920ca6f7cd",
    label: "Elemental Fursuits"
  },
  {
    value: "216ee1e4-0336-4bc5-ab3e-f15e85c84d4d",
    label: "Elk Craft Fursuits"
  },
  { value: "762da621-2e12-4167-97a4-a7f272896b7b", label: "Ellies Fursuits" },
  { value: "7fc83c62-94a0-4b3b-a064-662e8393e382", label: "EntryLevelFox" },
  { value: "a5d38ca0-0594-4fb0-9ae2-53b890729b3c", label: "Errowolf" },
  { value: "10fb6d1a-6259-48ab-b947-1c72dd266f31", label: "Esuterure" },
  { value: "7c472231-a112-4cec-9f98-29e6b71e4eb0", label: "Eternalskyy" },
  { value: "ccd23bea-7b46-444e-b67a-2120a2451a0d", label: "Euharmonics" },
  { value: "9566fa04-a1ed-48ac-ac5a-19958fd0d2a1", label: "Evil Bear Fx" },
  { value: "cd5a62df-0e86-4c90-af8b-0cbfc7eff49a", label: "Evozarro" },
  {
    value: "f50d5461-b3c9-431b-990f-674c83b985a2",
    label: "Excelsior the Lion"
  },
  { value: "6944a710-670c-480b-a6a2-ad9e39820027", label: "Ezza" },
  { value: "05a16314-4e77-40d2-91b1-aae1d5b6a351", label: "Facemakers Inc" },
  { value: "d4fc1cf8-bbc8-4b13-afb6-fcae03a8ca91", label: "Fallimar" },
  { value: "8d1ea0d7-3435-4287-ab2d-f07369c3d58e", label: "Fancy Beast Suits" },
  {
    value: "18a94bed-1275-481c-baba-4377ca79ba6a",
    label: "Fancy Fish Fursuits"
  },
  { value: "e30eb841-4e2c-467a-94b3-a7749f7cf55b", label: "Faris Batwan" },
  { value: "11faeb58-2419-4f04-9e7c-305cb8368e1b", label: "Faruku Costumes" },
  { value: "6eaf855a-4976-4bfc-b585-b4bfc9a5a4d3", label: "Fatazndog" },
  { value: "d933d55e-b0d7-4730-a71b-d9ce4f3f6854", label: "Fatkraken" },
  { value: "cb5f192c-4429-42d2-9618-f37b1f935cb6", label: "Fauxpawroo" },
  { value: "549c70dd-a4b9-44ed-ba6d-f49669aa18b5", label: "Feast of Dreams" },
  {
    value: "cf3b53d9-3afc-48e9-9a42-2ee0cafc41f2",
    label: "Featherbat Fursuits"
  },
  { value: "5a4e144f-daa7-49b2-820c-5cf688952782", label: "Feely's Den" },
  { value: "b4a6fa64-37d3-407a-b9a3-39ac735a1cc6", label: "Felixkatz" },
  { value: "19232f24-643f-4263-b9f1-3d365103b58e", label: "Fenné Crafts" },
  { value: "bd1e4b97-7391-41fe-8b2e-eb9ddacdf7d8", label: "Fenrirs Child" },
  { value: "86f74ff3-9c24-44a3-8e6b-267260586f48", label: "Feral Facade" },
  { value: "c2fa3fe2-ef01-41ed-8ef8-8ed6f122a360", label: "Finnish Fox" },
  { value: "de290bfe-50e1-4b4d-9adb-8c515705ee8d", label: "Fionka Fursuits" },
  { value: "d9e6ed45-14b6-48a6-9501-f4a2024ca9ff", label: "Firestorm Six" },
  {
    value: "6c618a58-6053-45f1-a83d-1147f483fb4b",
    label: "Fish R Furiends Studios"
  },
  { value: "05c373ff-c4c9-495e-9a15-ad916480834d", label: "Fixit Fursuits" },
  { value: "27c79ccf-2990-4f63-b07e-84cd454117b8", label: "Flacko" },
  { value: "a2e0db2c-e3a7-46fd-8d6c-af0225f21606", label: "Fleecerot" },
  { value: "169b2eba-5318-46b9-9edc-7cd77253f866", label: "Fleeting Fennec" },
  { value: "a1a7774d-bbff-4e8e-b30b-70ee02054b02", label: "Flix Dragoness" },
  { value: "b355a823-1ffb-4fb6-8d26-159bfd28e6a8", label: "Flixsuits" },
  { value: "5eb5675c-e996-4ce2-bd06-a150fe9982c9", label: "Floof-Batsuits" },
  { value: "2ff53225-eb4d-4afa-90b8-10a1c984c9af", label: "Floof Unlimited" },
  {
    value: "e687f2f0-3041-4736-a5e6-17b718bb5262",
    label: "Flowercity Fursuits"
  },
  {
    value: "ed420081-7e91-4b48-b17e-c724e48176f0",
    label: "Fluffenough Creations"
  },
  {
    value: "1a3746d2-05d6-4955-b7f2-287f92e7d7da",
    label: "Fluffy Stuff Studio"
  },
  {
    value: "f2ce2620-d7ac-4aa8-bb24-3e43f4098320",
    label: "Fluorescent Paw Works"
  },
  {
    value: "2098ecc4-54e1-45e9-8a01-71987ff32c48",
    label: "Forever Furry Creations"
  },
  { value: "5ccfcf07-bb78-450b-8aa8-f867fb96ca75", label: "Fossa Studio" },
  { value: "5cf6eb31-112e-457a-ba3a-e765188b08de", label: "Fox Convoy" },
  { value: "b797c7fc-656d-4ddd-a26c-6ef659012686", label: "Foxfairy" },
  { value: "51c3199a-5110-4376-be00-7aa56b5be696", label: "Foxfeather" },
  { value: "e70a9e85-9f72-4115-8769-0e78588366f5", label: "FoxPupMeow" },
  { value: "212cdd02-0f8a-445b-b1e3-142f3458d017", label: "Foxysox Studios" },
  { value: "51dd30b3-e2fe-4fda-87ed-f236b82d4095", label: "Frazzles626" },
  {
    value: "44d1eb6c-2ede-4aef-839e-2995760bce69",
    label: "Freakhound Studios"
  },
  { value: "eac88b32-de62-4d52-b8cb-6d06740b5381", label: "Freaksnow" },
  {
    value: "d54ab2a2-a721-4c86-84f0-bc87f03ff09d",
    label: "Freedom Spirit Creations"
  },
  { value: "6b901661-b8a2-48c9-bee9-55d757c38de2", label: "Freya Fox" },
  {
    value: "4342f64e-c775-41c8-bd29-e4e1f45cf7cd",
    label: "Frostbite Fursuits"
  },
  {
    value: "879601bd-226f-4ec4-aac2-b4c37e08991c",
    label: "Fruitsuit Creations"
  },
  { value: "04fd8140-377f-4d86-8d18-18ee61ccabbb", label: "Full Moon Special" },
  { value: "5d464b7b-b77d-4118-923a-c76062ce3f8b", label: "Fun Fur All" },
  { value: "53202a91-5403-4fa2-b67e-d237c8f2483e", label: "Funky Soul" },
  { value: "0dbc1b3a-f87b-457b-96bc-e15db99770d7", label: "Funny Farm Makers" },
  { value: "5da01816-7d52-487c-92c4-ce1f40d1e4ba", label: "Fur and Feathers" },
  {
    value: "c127d626-2d68-4828-b6de-523d2ca7f147",
    label: "Fur Fancy Costumes"
  },
  { value: "b00a36e8-8f4e-433e-b911-21c311fe1ecf", label: "Fur It Up" },
  {
    value: "15c75104-0585-43fd-afbb-756eaa446691",
    label: "Fur The Win Studio"
  },
  { value: "756f0aed-5ca9-4779-abc4-ebc3f4224eeb", label: "Fur Your Dream" },
  { value: "907bf94f-d4e0-4101-a67f-5af0b5abbfcc", label: "Furbrications" },
  { value: "3e2bed91-c3d7-4e19-a5d8-8facd38047be", label: "FurDelicious" },
  { value: "da6a090f-43fa-4e58-b3bf-888ac637fea7", label: "Furducers" },
  { value: "a0e17c76-68d1-4205-ba1a-438f28e55a95", label: "Furensics Studios" },
  { value: "1d2f90c6-8902-4c8f-be1a-412ec7d8fd14", label: "Furfancy Costumes" },
  {
    value: "06a98b6e-4935-4268-a907-e08e368c754c",
    label: "Furfect Pit Studio"
  },
  { value: "1a60e8dd-4c5c-4ac5-adf8-0bb23f40f2f8", label: "FurForge" },
  { value: "9ece1fa0-0f6d-4b71-8693-264ce3161a4a", label: "Furfrontier" },
  { value: "c42026d3-6413-4e07-b3ad-40ce4292dc1a", label: "Furgen Studios" },
  { value: "ab0e14fa-06d3-4196-ab2a-ecc3979ee0c4", label: "Furhonor" },
  { value: "879136f9-3bcf-4032-a725-81dbfb4fe049", label: "FurLaMascota" },
  { value: "399e3ea3-9cdc-4ef5-92ce-53a01556ca06", label: "FurR Club" },
  { value: "ca2b32d3-c7c8-4694-aa5a-9a795cba817e", label: "Furr Happens" },
  { value: "62885f6f-4c0b-4efa-8e00-ec01915a000e", label: "Furred Fantasies" },
  {
    value: "d74abd3d-502e-4748-b646-fcc40f8de316",
    label: "Furred Out Kreations"
  },
  {
    value: "453fe735-5c39-47cb-a6f4-40b31aa39124",
    label: "Furry Crossing Creations"
  },
  { value: "38407ff2-eac7-4bc5-9032-5897c9ee4b96", label: "Furry Factory" },
  {
    value: "3053268e-92ad-4717-aa16-9d19074e4d9d",
    label: "Furry Fursuit Maker"
  },
  { value: "09685653-8eee-4f5a-b8ed-0a5f22291a55", label: "Furry Machine" },
  { value: "916319c7-eff0-42a4-b33b-3cd4ddd11e69", label: "Furry Squad" },
  { value: "2b9e6b0d-b78d-46b7-9023-4588ac383e85", label: "Furry Studio" },
  { value: "4aa986d9-75ca-40b5-8ac5-123d8d949b38", label: "Furry Tailor" },
  { value: "968f9a34-61bb-4919-a9ee-646be12c07c6", label: "Furry-K9" },
  { value: "78d9753f-7651-49bd-99f8-bcd3d36f8ede", label: "Fursewna Studios" },
  { value: "5f8e05fe-e1e8-4286-9218-e6476b2d7b3a", label: "Fursonalities" },
  { value: "8c156515-b98e-4460-bfc0-7c153c5938c0", label: "Fursuit Creations" },
  {
    value: "a5d83995-2cf4-4ac2-a513-f7cd7b405a5c",
    label: "Fursuit Enterprise"
  },
  { value: "7f2f1b4d-f673-47ad-954c-a28b9c2757d0", label: "Fursuit Funday" },
  { value: "d9d89dc3-206b-448e-a64b-9201a03ace30", label: "Fursuit Parade" },
  { value: "46a7cc57-8f93-4432-ac85-2191e51ada17", label: "Fursuit Up" },
  { value: "d01fa41a-5084-43db-b7e8-1e0018479d5e", label: "Fursuits by Lacy" },
  { value: "990634aa-3435-4a16-87c7-7a0ff5a89b86", label: "Fursuits by Mars" },
  {
    value: "a9faf665-3e33-44ad-b186-4dcfe3352974",
    label: "FursuitsUK Creations"
  },
  { value: "7772a6af-ceaa-4fab-ad1b-c48257bbd63c", label: "Furtastic Studios" },
  { value: "08a753e9-b30f-4183-8470-01be7649ffee", label: "Furtic Studio" },
  { value: "0f0af909-ed52-490a-a642-688434c7e09e", label: "FuruArts" },
  { value: "93c3d90b-0e8c-4ce2-82a3-d1970ac3442d", label: "FurZombie Studios" },
  {
    value: "385423c7-2578-480a-bf0c-5a45243c5f41",
    label: "Fuzz Butt Fursuits"
  },
  { value: "c749818a-6be3-4e3e-837d-e1299ddf16e8", label: "Fuzzworks" },
  {
    value: "9d661046-30ca-4a79-a4e3-a9db1d5528d3",
    label: "Fuzzy Buns of Steel"
  },
  {
    value: "35dcdacd-30bf-4321-a366-2399b9c32225",
    label: "Fuzzy Fur Creations"
  },
  {
    value: "78e76fdb-240f-41cf-8a4a-2cab6e4739a3",
    label: "Gaderian Wolf Fursuits"
  },
  {
    value: "55f44ce4-1300-4e88-a35f-6df78fde10e2",
    label: "Galaxy Wolf Creation LLC"
  },
  { value: "8a2c2c2f-74e2-467d-ace2-e099eea54dd9", label: "Galesmilax" },
  {
    value: "22106b43-4d12-4ca0-b3ed-c1aa896f42da",
    label: "GEEKpaw Productions"
  },
  {
    value: "5466a127-bb65-4d46-a298-53ed4f586fc8",
    label: "Ghostwoodcreations"
  },
  { value: "f2374ff0-a60f-40cc-9982-43662d081545", label: "Gitz" },
  { value: "f58718d1-a188-4e13-847f-3be9ab253dfb", label: "Glow Fox Studios" },
  { value: "f583d8c1-0fb4-4a8a-8769-2ccaf4ff21b8", label: "Glow Sheep" },
  { value: "236ef9d9-7d31-47f4-ae37-927894212bbf", label: "Go Fur It Studios" },
  {
    value: "17289ae1-e79c-41ff-a545-9ce588f89be1",
    label: "Gold Ribbon Studio"
  },
  { value: "da4f29eb-e877-4b85-aa1e-06991a3eb525", label: "Golden Maw" },
  { value: "9a34eb90-c6d6-49ce-88b5-dd10a7c2d9e5", label: "Goldmouse Studios" },
  {
    value: "35d86340-86c1-473a-bf74-3acc37a09dfd",
    label: "Graveyard Stuffers Suits"
  },
  { value: "122ea22f-54d9-4447-a0f9-f7f85f4a2521", label: "GrayREALM Studio" },
  { value: "a077cee4-3ece-42a6-b952-9e651da8e0c4", label: "Greyfox Workshop" },
  {
    value: "7f1506ed-b846-40eb-8c30-36141ec92521",
    label: "Grinning Tiger Disorder"
  },
  {
    value: "0ae59c7d-bad1-4ce5-b2ec-ccb08aa01610",
    label: "Gronway Commissions"
  },
  {
    value: "a491dcf9-213c-4189-a9c1-62f0ab7277b1",
    label: "GroovyGoat Costumes"
  },
  { value: "139c80a8-4e4a-4375-b754-93d759ca6fcd", label: "Grotto Creations" },
  {
    value: "2d25818c-b02a-4f1f-96da-44774971df77",
    label: "Grove City Fursuits"
  },
  {
    value: "31758885-569f-4b9c-a3a4-4b9e10f18c09",
    label: "Guinns Custom Creatures"
  },
  { value: "34b7fb47-971a-4155-b9b1-99e587a65866", label: "Hakumei House" },
  {
    value: "5ae2bb3c-ba5d-4515-9b9c-ee778a6b0263",
    label: "Halfblood Creatures"
  },
  {
    value: "237dedfa-39aa-47f2-aead-86ca203b8613",
    label: "Happy Tails Costumes"
  },
  {
    value: "19b45b1b-619d-43c4-855f-be1abc945fea",
    label: "Harvey Manki Kang Cat"
  },
  { value: "c5ebc7c1-86f8-4717-b975-2086f42197ee", label: "Hawthorn" },
  { value: "ec12feda-cc20-4359-995b-3665441e2a24", label: "Haz Studio" },
  { value: "0ca85306-26f2-428d-991e-fd2268209f4d", label: "Head Over Tails" },
  {
    value: "116972a7-eee7-4824-a166-285d3d83709e",
    label: "Headless Hare Creations"
  },
  {
    value: "a24f4149-e612-46ff-b9d6-3bcdf8393d65",
    label: "Heads and Tails Studio"
  },
  { value: "31aa71d7-c027-4559-ae22-3fb939b3ca4b", label: "HeckGeck" },
  { value: "8299c467-b302-4934-b8fa-36bf847ec6ad", label: "Hell Charm" },
  { value: "d1cfcb7c-7cd8-42fa-b2b0-bfa820ec2c8a", label: "Hidden Arts" },
  { value: "1f8c6cae-3981-402f-88f7-0f5877c6c264", label: "Hidden Treasury" },
  {
    value: "a4fb3f56-c74e-440e-b124-59f3969619d7",
    label: "Hiero Craft Creations"
  },
  { value: "fe53d8f4-4ee5-41dc-8869-8797a34f71e9", label: "Hikarinaka (DKAG)" },
  { value: "e11fb2a5-b4cf-46e3-b0b7-5edfc5026745", label: "HoneyspydeR" },
  { value: "120e36a9-ea10-41bd-acf1-e82c9aa5ef25", label: "HoofnHard" },
  { value: "bb707d71-d881-4515-881d-abf015959057", label: "Hounds Teeth" },
  { value: "979f40ba-b6de-46e4-8cb2-15d12a47b576", label: "Hunters Creations" },
  {
    value: "9890de9c-7421-4ccd-a253-f64b129ba582",
    label: "Husky Moo Creations"
  },
  { value: "a573fc44-d189-48f5-bdab-190b62665637", label: "Hybrid Studios" },
  { value: "de3d927d-6dde-45f1-a5f4-f55823fcb897", label: "Hyena Girl" },
  { value: "417974be-bfa2-414f-82bc-9339c1132196", label: "Hyena Hoy" },
  { value: "f2a6db0a-27e5-4ff6-a3af-5160eeac32e0", label: "Hyokenseisou" },
  { value: "73159d23-7225-43e5-b1f0-7ae1909cb4ae", label: "Ichi" },
  {
    value: "e6bed5c0-05ae-4cdc-a086-7cbac4739fec",
    label: "Icy Paw Productions (Nevask)"
  },
  { value: "cc89dc67-a14e-4c34-bd46-feb95b39a99b", label: "IJustLoveStuff" },
  { value: "0320d749-5291-4a4e-8379-17c63e61c701", label: "Illimearu" },
  {
    value: "454ba8e1-6c1e-4782-8b58-714fdab54631",
    label: "Inajiffy Creations"
  },
  { value: "51bce89c-50ec-4481-a62e-8c47a550f9e9", label: "Inerri Creatures" },
  { value: "97f42a57-683d-4cfb-ad48-bcd4f9bd5322", label: "Inkfire" },
  { value: "d9d14cff-1059-44a4-8bbc-c5e75c472065", label: "Irinae" },
  { value: "9936691f-c2b6-4b7e-b447-7dce79f0ba63", label: "Isabelapparel" },
  { value: "b16b04c9-e38d-45e6-8603-e858d1e1cf9e", label: "Isabella Price" },
  {
    value: "8f51fae8-f743-4b28-a128-689498ebd509",
    label: "ISqueakyPinky (Mini Wolf Arts)"
  },
  { value: "561bbffa-d651-4079-afe4-7d558051d06a", label: "Itallonova" },
  { value: "67d3bde5-b0e6-46a6-b65b-69642f09a630", label: "Ivanitko" },
  {
    value: "bfd7c83c-3583-4ef8-87e2-1940bf32491f",
    label: "Jax the Purple Bat"
  },
  { value: "66aca0e6-4baf-4bd5-85e1-7ea3f9f8d42f", label: "Jello Vair" },
  {
    value: "d0be653a-f712-4e80-aa20-586c71ec5a33",
    label: "Jenetixx' Creations"
  },
  { value: "ff70692f-8d03-49ef-97f2-6ff7c2463dfd", label: "Jesse Frosst" },
  { value: "7ac0fc5e-0bd9-4f71-9cb5-16233c659ce2", label: "Jill Costumes" },
  { value: "5be2d252-e519-4f9a-b314-d5a39105a846", label: "JjreamBig" },
  { value: "a80d790e-b28b-4d83-a72f-73423a03ad8d", label: "Johara" },
  { value: "17e8cabb-85cd-443a-8085-72b14e4c0bb5", label: "Jpupbob" },
  { value: "c6238677-a5bc-4327-a0d9-5ff60f114f33", label: "Just Fur Kicks" },
  { value: "8d1e9ba9-8299-4e1e-a8e4-1a7c8a362faf", label: "K-Line" },
  { value: "0283ec9b-a7a8-443b-af57-7634a15ab60b", label: "Kaibab Costumes" },
  { value: "d424316a-8cbb-4160-a822-092358e50ea8", label: "Kaiborg Studios" },
  { value: "7fbf45bb-2b47-4681-bc6b-edc23d302b20", label: "Kaidas Kingdom" },
  { value: "19990f23-73b8-4bfd-aff9-df0009e3412e", label: "Kaiju Costumes" },
  { value: "ae6f9ccb-2194-4d86-9c7e-d012e7e7066f", label: "Kaijugal" },
  {
    value: "ffda9aa3-ed98-4c03-a075-090ed9ad389a",
    label: "Kandorin Creations"
  },
  { value: "592245bd-e84e-415a-957b-c8733a4b49bc", label: "Kangaroo Feathers" },
  {
    value: "73192150-dd81-453a-8124-2783cb5aadec",
    label: "Kangaroo Reef Mascots"
  },
  {
    value: "7b4d0af3-2aff-487e-a31d-3cb25ee5dbd6",
    label: "Kani n' Hyacin Productions"
  },
  { value: "ba044253-49fe-4905-8285-574f8a087d57", label: "Karthegrax" },
  { value: "1a22bac7-c67f-490e-9a0d-af04c1b2b48a", label: "Kawaii Vixen" },
  { value: "2db9e1d3-70e2-4b6b-9814-c46ad191e886", label: "Kayla's Kritterz" },
  { value: "7afa6050-bbc7-4767-9302-cbccf63481e7", label: "KaZ Fursuits" },
  { value: "f75e380e-895d-4f29-9061-7b9f516fc207", label: "Kazulgfox" },
  { value: "4f7acc63-30d0-4335-b91e-35bcf3285ead", label: "Kazuto Kurama" },
  { value: "efd9e04d-9917-499f-bc72-d9fecb2444fe", label: "KC Costumes" },
  { value: "9c11f1fd-6f5e-4173-bf87-43070e515d69", label: "Keeper of Dreams" },
  { value: "f508b376-e7f6-498f-9971-12550c13e566", label: "Kegawa Creation" },
  { value: "04d10223-eb18-4fdf-83c8-40dbe6d9ecfc", label: "Keiko Vixen" },
  { value: "825668c2-0451-4120-af55-8f46283ae580", label: "Keira Blacktalon" },
  { value: "6adc1f5d-fc47-40b5-9840-e05267c1c8a9", label: "KemoSuki" },
  { value: "9b113fa8-4860-4109-b801-01ff39b108c8", label: "Keto Fursuits" },
  { value: "78945adc-b543-431c-be1f-592819905f52", label: "Keyoki" },
  { value: "62f63873-0bc0-4e0d-8799-1ea11b7f5f4d", label: "Keyoto" },
  { value: "c0922ff8-249e-43c7-9a54-97ec27fa4623", label: "Kilcodo Costumes" },
  { value: "10216ce0-9405-480a-8544-6b974cee9cf6", label: "Kimba Snowpaw" },
  { value: "3312894c-a2c7-40d8-a388-8e7bc45f56fc", label: "Kinghime" },
  { value: "9dc2513e-cfab-40a3-ae9e-50104e605c1c", label: "Kinred Fox" },
  { value: "50b999c1-0e2c-4ebe-ba21-8a1f02222558", label: "Kisu" },
  { value: "283a41ac-8054-4f00-bb5f-74cf74e61c4e", label: "Kitsune Illusions" },
  { value: "73cdd26c-b5ae-40ab-920b-674de5583a27", label: "Kitsune Studios" },
  { value: "62ba8a1e-f128-4a07-ab92-a2b3c3e4a004", label: "Kitt Creations" },
  {
    value: "3881a60a-e13f-4dbc-a8a3-44a7d332d938",
    label: "Kitty Fluff Costumes"
  },
  { value: "1244063c-5ab3-497c-91f2-867ce0f1a68e", label: "Kiwihunter" },
  {
    value: "f004b19f-c637-419a-aa28-fa01154869d2",
    label: "Klickitat Matrices"
  },
  { value: "02a429f3-0aa5-46ba-8dce-5803be729f2b", label: "Kloofsuits" },
  { value: "0b49a14b-c610-4e18-8711-6ee477b3838e", label: "Knossos" },
  { value: "7a9dd72a-87a6-49b1-99ee-86c0c6e9eeec", label: "Kodi Fursuits" },
  {
    value: "0ec5b096-071b-4b6e-961e-c106d67a4642",
    label: "KomicKrazi Studios"
  },
  { value: "facd4c0a-f6da-4a00-81b3-b8a14e917a42", label: "Kurauno" },
  { value: "80579641-2031-496e-b8af-c5655025da09", label: "Kyanite Creations" },
  {
    value: "8bc7eeb5-0e56-45c9-a19f-b72ad144ae29",
    label: "Laela McPitty Suits"
  },
  { value: "51f09c31-e8d1-40b1-b0e4-4d114d633d4b", label: "Laken Steeljaw" },
  { value: "d4c1b0b4-0ccb-4811-a27d-59e8015176a2", label: "Lavafox" },
  {
    value: "9f4fa64d-14bd-442e-8a0f-5b8668032c38",
    label: "Lazy Leopard Fursuits"
  },
  { value: "c0d1d113-2294-468a-9269-9c059b9b047d", label: "Lazy Lupe" },
  {
    value: "2e12e2c8-ee84-4d16-9015-7a10d9799f48",
    label: "Lemonbrat Fursuits"
  },
  { value: "0ddc9c96-6a99-4d52-8b2c-8a63a5588f09", label: "Lenny Mutt" },
  { value: "46b04655-1541-4629-bd4d-af683ffcdd8c", label: "LeoneLaTwerk" },
  {
    value: "e8d8d24f-670b-4c0c-9a63-b390cf208e51",
    label: "Leopardcorgi Creatures"
  },
  { value: "fe449993-f6dc-45ce-bf4e-18683e1f1db8", label: "Lhbeau" },
  { value: "9883680d-da88-485d-a020-b2c69f8787de", label: "Ligercraft Suits" },
  { value: "9ca59fc2-e402-43e8-ab57-80eb6368bccf", label: "Lillie Likes Peas" },
  { value: "fd8dfb9c-d936-4ede-995d-137f3f6b39f1", label: "Kitsunerawr" },
  { value: "1b98c4e0-f709-4c14-a678-152a68e960bc", label: "Lion of the Sun" },
  {
    value: "a405e3ff-bf2d-4124-befd-72c3023a8902",
    label: "Little Fangs Fursuits"
  },
  {
    value: "e208a62b-1c20-4054-8ca7-076f2f1a1d01",
    label: "Lizard King Designs"
  },
  {
    value: "714e997e-c37e-4bc2-8c32-1d48aaf5eb9f",
    label: "Lizard Loves Mustache"
  },
  { value: "c6bc12d7-1afd-451a-8a86-eb98bdafe29e", label: "Lizaruk" },
  { value: "0685ea6e-a575-417f-baac-d3727dfecf06", label: "LKR Mascots" },
  { value: "8b127789-5807-4c8d-8bca-c2e15a73bd63", label: "Lobita Works" },
  { value: "39601dfe-ff0d-421c-a1f6-35948a1bed27", label: "Locado" },
  {
    value: "e1e109fb-3e10-4b93-bca6-7877f043c67b",
    label: "Locomotion Fursuits"
  },
  { value: "8f0e37a9-1435-455c-815b-9e5db9440164", label: "Lodi Dah Fursuits" },
  { value: "d10d82ca-7c0e-4a8d-9ad3-917f8b91bec2", label: "Loris" },
  { value: "2cc39fbb-056e-40e1-98f1-68118a13aaf3", label: "Loui" },
  {
    value: "6255023f-3817-4368-b22a-27f81d65f769",
    label: "Lucky Dog Fursuits"
  },
  {
    value: "746ab4d9-a39f-4ff8-b75e-4de7f899d587",
    label: "Lucky Gum Fursuits"
  },
  { value: "376730f7-24b3-4756-8913-cd4e540aa87f", label: "Lunar Forest" },
  { value: "327e271a-78fc-43f1-9a9b-c63abd6ee90c", label: "Luno Vulpes" },
  { value: "5876c162-95b8-475d-867b-98445a2a2b20", label: "Lupinemoonfeather" },
  {
    value: "82fabddd-c702-476f-ad59-4960dac14424",
    label: "Luskwood Creatures"
  },
  { value: "d66927e7-a802-4209-8f96-07043c53b501", label: "Macaroni Market" },
  { value: "349b451a-98a8-4ed4-b3d4-70d13f093af7", label: "Mackoolzie" },
  { value: "acb6f92a-bee9-4ae9-96c5-9aae18b33944", label: "Made by Mercury" },
  { value: "9d589afb-6ba1-42a1-b6e4-3c93839f9c62", label: "Made by Muttmix" },
  { value: "a8a1722c-75a4-4d7b-8d8e-47fd8efab706", label: "Made Fur You" },
  { value: "14677766-45c8-404f-8b67-e8e631e711d3", label: "Made in Holland" },
  { value: "55920175-c7b7-4784-a0ac-b22c19f28ba5", label: "Made4Hugging" },
  {
    value: "df8f76c6-1cfe-498f-8a98-b8c47329f0c1",
    label: "Magic Foxy Artworks"
  },
  { value: "84de3550-624b-4523-89fd-d27320e07329", label: "Magnus Diridian" },
  { value: "44da304d-0101-41ed-9e49-5592b3136bb5", label: "MagpieBones" },
  {
    value: "766c98e7-c800-4c13-b65d-3257ec210f31",
    label: "Mango Island Creations"
  },
  { value: "2ee8d89a-1455-4f89-91dc-a61eef74f45d", label: "Mangusu" },
  {
    value: "94762562-ec62-495b-9f7f-715372ae6a0d",
    label: "Maria’s Creative Corner"
  },
  { value: "0db7293a-b4df-4d60-b9da-af8b3a3f014b", label: "Marylen Costumes" },
  { value: "6d4e61f6-c88e-439a-a4e4-6f8f8c72991a", label: "Matrices" },
  { value: "219232dd-7d8a-4147-a230-3bcb832a8ddc", label: "Mei Fursuits" },
  {
    value: "f6fb9be4-7f94-4dc4-9a80-87b42ad54ff1",
    label: "Melissa Mendelson Art"
  },
  {
    value: "aa9a46b8-9a91-4e73-9790-191f817e9969",
    label: "Menagerie Workshop"
  },
  { value: "23f869a9-c05b-4302-bffd-e9670e0aec3c", label: "Mercifur" },
  { value: "d27d9c96-498b-43cb-b96c-dda87db777bd", label: "Messerschmitt" },
  { value: "7e6b58e9-213e-4b5e-8fa3-070c2304ac0f", label: "Metaldog00781" },
  { value: "c7e07dcc-7659-4d99-af2e-2c3d0b3f539c", label: "Micro Mascots" },
  { value: "ff8d0515-a8ee-46d3-90dd-d121b1071aad", label: "Midnight Swimmers" },
  { value: "fa74f3d8-9eb4-46a8-8177-436b01cfa2da", label: "Midowko Art" },
  { value: "e5942951-da64-4f5c-9258-93be39cbfa58", label: "Mini Boss Mascots" },
  { value: "24432b56-5fb0-47cc-bf7a-a3ed0a361b4f", label: "Mirepoix" },
  { value: "1855ca2e-2dbc-4145-aedf-190482d02cf9", label: "Mischief Makers" },
  { value: "fbcdfbd1-6582-4f75-ba75-b6e4ec26c45f", label: "Miss Wolfiee" },
  { value: "eda4b382-ccae-4db6-9046-527453a369a0", label: "MissRaptor" },
  { value: "f08ce352-4ef9-4236-95e7-a97040801ca0", label: "Mitha" },
  { value: "61d06f6f-8925-4592-ac10-a28a440a8a16", label: "Mixed Candy" },
  { value: "3d072fec-9ef4-4d67-85c5-bcc6175e11c9", label: "Mixed Monsters" },
  { value: "d12e6398-6728-4984-a04c-f11eaff78c09", label: "Mochiri" },
  {
    value: "d1916e24-b6c8-4aa6-b444-a05ed805fbdf",
    label: "Monkaus Furry Bitz"
  },
  {
    value: "d9b4cb70-9c04-4978-90f2-60eb5bdd939c",
    label: "Monster Cat Creations"
  },
  {
    value: "ecd0b698-4334-4546-95cc-9d5da3759e59",
    label: "Monster Deer Creations"
  },
  { value: "c9243fd9-75ca-4891-bf10-9242fe4a06ef", label: "Moon Devourer" },
  { value: "079508b2-9f08-4d56-8b8b-1236ac194513", label: "Moon Mochi" },
  {
    value: "53598204-f922-46f1-997b-04e888b16533",
    label: "Moonlight Delights"
  },
  {
    value: "b52da1ac-b48d-4818-be61-cc054a0a9e48",
    label: "Moonlightbatshadow"
  },
  { value: "572958a1-b1cd-4c80-b3a3-8078fd833ffd", label: "Moop" },
  {
    value: "fa23d814-7bdc-4906-aea5-2bbc42036af9",
    label: "Mordrudes Monsters"
  },
  { value: "a85a25f4-a2c3-441e-9eec-f8ac36482114", label: "More Fur Less" },
  {
    value: "efa73c04-0329-436e-b592-b6cbb9ac28e9",
    label: "Mostly Bad Costumes"
  },
  { value: "32560ace-86c7-43dd-8c54-dd569863c89b", label: "Mothsicle Suits" },
  { value: "645c41b8-67a2-455d-ac33-d264505e0880", label: "Mugiwara Cosplay" },
  { value: "ed25dc67-3977-4625-aee0-2156a62b80f1", label: "Munchkin Bunny" },
  { value: "75accab9-7357-458e-ba2f-8241cd85d0cb", label: "Muntjacked" },
  { value: "ce54cf35-59e3-46d8-9c2f-32046de4b5e4", label: "Mushi Crosshairs" },
  {
    value: "9f2de3a6-1ff8-4f52-aca3-c3fe81c62097",
    label: "Mut-Mut-Fur Costumes"
  },
  {
    value: "b9f34879-0d77-42ae-b4c4-1e3b78245001",
    label: "Mutt-Zilla (Marshmellow)"
  },
  { value: "cb0abd8a-bf5e-4123-a82a-023364e2276b", label: "My Fur Creations" },
  { value: "aedf9074-e494-40c8-9371-d21a098b76f0", label: "Myrtle's Monsters" },
  { value: "90b119e1-850c-4c03-a359-1237a067eb79", label: "Mystic Creatures" },
  { value: "43af28b1-68a7-4d30-af7e-b8fc89f086e9", label: "Mystikreatures" },
  { value: "2aed08b6-7e16-4c25-b9e1-0e2d858ced9a", label: "Nafierye" },
  {
    value: "b9992da0-e504-4fcf-b6a8-da2f1fd0ccf8",
    label: "Nagowteena Costumes"
  },
  { value: "c4e40b75-7328-46d6-b3cd-4f024811c4d1", label: "Natsuro Suits" },
  { value: "bf44f7b1-ebf0-495e-a074-8221f3d05ffc", label: "Neala Appaloosa" },
  { value: "ba837221-69b0-4901-8362-551893aaefb8", label: "Neex" },
  { value: "eede68bf-b11c-4e14-b31e-12666e9626d1", label: "Nekofelin" },
  { value: "3f2bbcf1-c8c9-4106-b2f7-a61b4c4cb1fa", label: "Neon Fur Studios" },
  {
    value: "c908dd60-1591-4362-899a-c4dba8dbd42f",
    label: "Neon Puppy Creations"
  },
  { value: "88cd97b5-3f73-4e2d-bf4e-2c5b72b2bf59", label: "Neonr0se" },
  { value: "a49d2e34-cf47-4d45-b459-16e009476d78", label: "Nether Den Studio" },
  { value: "d28843c9-44a7-4ec6-bcee-362272b17268", label: "Nifeline" },
  { value: "22f3670e-9877-41b6-bdf3-635bff92c023", label: "Nightfell" },
  {
    value: "9b2f7350-1bc0-4d61-9856-d692e42bee0b",
    label: "Nightmare Beast Creations"
  },
  { value: "0015fb03-a10e-464c-bc5c-66e1bf74b3ec", label: "Niiku" },
  { value: "18d2acb5-c81e-4982-b970-dda733deb15b", label: "Noble Productions" },
  {
    value: "235a0f1d-fc2a-4987-a93f-5abc5796a5db",
    label: "Norman Patches n' Furs"
  },
  { value: "37a87d2d-4dd9-4a35-9f0f-535710532b6a", label: "Norsepaw Studio" },
  {
    value: "74e7cd62-92cd-474b-b7d7-76fd1d797298",
    label: "Norsewolf Creations"
  },
  {
    value: "489dbd08-fe99-4448-91f8-348d9e374f26",
    label: "Northcat Creations"
  },
  {
    value: "ff927fc6-4942-43b4-811a-7a9df6f42204",
    label: "Northern Lights Costume Company (Wolfbird)"
  },
  { value: "b78c9082-2169-43f7-b781-64cba7345a4e", label: "Northfur FX" },
  {
    value: "54648b20-c364-4be8-ba12-48b280811987",
    label: "Northshore Mascots"
  },
  {
    value: "219cce84-7297-466c-80b4-f8d7490f71b0",
    label: "Nucler Fur Creations"
  },
  { value: "57bfb23f-92f1-496d-ac6b-b081d0c970cb", label: "Nuke Creations" },
  { value: "34e48885-2e85-483a-9d0c-bac07eaec747", label: "Ocicat" },
  { value: "18f931cf-e044-41f6-aa51-6c46c4bd5bb6", label: "Og's Fursuits" },
  {
    value: "7dc4467c-be48-49a8-a29c-10d48634533b",
    label: "Ohmega Suit Studios"
  },
  { value: "1a0e9e9f-11bd-4209-b467-7df9ab0f3156", label: "Omega Paws" },
  { value: "0f747cdf-503b-4ec3-a923-cadd74e486f7", label: "OMG Pineapples" },
  { value: "76eeec7f-5f3e-454f-af04-93a91d822f4d", label: "Onai Wolfwind" },
  { value: "7625a0ac-47aa-46ad-8501-f533919d9344", label: "One Eyed Doe" },
  { value: "74c9c252-e797-4b83-9251-866fa4928ca8", label: "One Eyed Jack " },
  { value: "167875d0-6def-4330-aa27-e9d1d7c9fa1e", label: "One Fur All" },
  {
    value: "741b60a3-7361-4323-a2d1-30feb7351159",
    label: "Onix Angel Creations"
  },
  { value: "e87f3b1d-466f-4ad5-88ee-1dc78b81bca5", label: "Orwin" },
  { value: "53827202-3fd2-4d21-a4c8-2be53b762b24", label: "Otter Nonsense" },
  { value: "d27afd5a-929f-4c14-9667-0e7053bc2cb5", label: "Otter-n-Daughter" },
  { value: "991c8a9c-06ff-439e-b9c9-48d1de344296", label: "Our Mass Hysteria" },
  { value: "e2b811c3-92dc-4e57-83f1-d55b2330b84a", label: "Oz Kangaroo" },
  { value: "d4b3a507-d936-42e8-af90-7f554f024625", label: "P Pardus" },
  { value: "6c74696b-8160-4266-94d4-c0427a574c92", label: "Paciulo Fursuits" },
  { value: "e8c3c794-8658-4731-ba37-f3969f14bac2", label: "Paddlefoot" },
  { value: "a496a481-8a82-43e6-8504-09673e9e1317", label: "Palohmino" },
  { value: "b83370cf-83f7-4432-9cbd-16f7dcc5b469", label: "Patchworkpibble" },
  { value: "36ae5c3a-1f96-45f3-bffa-4011c4436a5c", label: "Pawaii Suits" },
  { value: "f65cb559-1604-4d8f-87da-ca7c909b435a", label: "Pawgazer" },
  { value: "a6a29b75-a248-4515-9eed-6c5847b82cbf", label: "Pawie Paws" },
  { value: "cb427867-6fe9-45c1-86fd-8c87377e68b1", label: "Paws Fur Effect" },
  { value: "b4f38bc1-85ac-4f2a-ba97-88e5c96df9cf", label: "Paws Productions" },
  { value: "2a500392-299d-4ad6-82d5-9b86bde22d57", label: "Pawsome Furries" },
  {
    value: "3e8a350b-d460-41aa-b631-09193bcb11c4",
    label: "Pawthentic Creations"
  },
  {
    value: "4c8fc2b5-0d9a-4580-9254-5e448bec2ea1",
    label: "Peacewolf Creations"
  },
  { value: "de5cba27-ca15-4905-ab34-641cf0918b14", label: "Penpenfoli" },
  { value: "c326125a-24bf-418b-ba2a-060e3b6196c4", label: "Phar" },
  { value: "78d9054a-0211-4e98-85e3-af3255df97d4", label: "Phoenix Nest" },
  { value: "f8688aa4-555d-41b5-8528-9227e77717b4", label: "Pink Fox Works" },
  {
    value: "0bae9db6-bc9c-4802-9e27-2d8e41283c3e",
    label: "Pink Gecko Productions"
  },
  {
    value: "21219349-60d7-4c76-8bfd-799e4a61d73b",
    label: "Piranha Petting Zoo"
  },
  { value: "c5e5b48c-e08b-4246-b545-cb82b50aae5f", label: "Pocalypto Designs" },
  {
    value: "ee4ca3eb-0a92-46de-aeab-701cf8e11795",
    label: "Pocket Wolf Fursuits"
  },
  { value: "58b7b6a1-cb22-4a10-9e5f-b419821cbdd6", label: "Pokem" },
  { value: "382ac582-07bc-4b47-9d18-affcdbfb0f76", label: "Polarlight" },
  {
    value: "88779ae9-c90b-4ed3-892c-564ff9d57f1c",
    label: "PotatoMonster Cosplay"
  },
  { value: "91ecf409-237d-45b9-afff-091be4ea3eda", label: "Pouchhopper" },
  { value: "63537cae-7d72-47f7-a485-aad6d0df72cd", label: "Prefur" },
  { value: "e6092adb-b279-45c9-a5b1-4b53a6dfd816", label: "Priamwolf" },
  { value: "0d1528fa-2ca3-4115-8b93-312d1193c4f0", label: "Primal Art" },
  { value: "37caf405-cc4b-481f-b7d1-43c916f7d62e", label: "Primal Visions" },
  { value: "3fc845ac-80fb-4abf-80bb-5e4d9f7cb1de", label: "Psybird" },
  { value: "1f61d6f2-151f-4e3c-8815-2c5f35a00cb0", label: "Pup1K" },
  { value: "0c1bdefc-ff85-4ae8-b534-ea5bc250034f", label: "Pyrope Costumes" },
  {
    value: "6b39f24f-a0b9-42c6-91d8-f011946f4704",
    label: "Queen of Yeen (Crafty Hyena)"
  },
  { value: "ef5fe6e7-4030-4bd9-ae82-1bab92227c52", label: "R5 Suits" },
  {
    value: "bff82281-01fe-483e-9bac-15a771ba996d",
    label: "Rabbit in the Moon"
  },
  { value: "ef3750df-89d7-42dd-9465-487e97cd07b7", label: "Rachel Loal" },
  { value: "d290080e-5160-4fcc-88f1-bab8ec60b8cc", label: "Radioactimals" },
  { value: "c74c1a2f-9aeb-4dc3-9241-67edfa3a847e", label: "Raditz Wyvern" },
  { value: "34512eed-eb37-4605-985d-545407ef96c4", label: "RadPandas" },
  {
    value: "bf5fbad4-e206-42d7-9ffd-4b5e1ddb5bdc",
    label: "Rage and Roar Customs"
  },
  {
    value: "97b03540-596b-4478-af32-1ce9508ef75d",
    label: "Rainbow Productions"
  },
  {
    value: "f72c7814-9174-4289-b5f4-da7734aa7ef2",
    label: "Rainbow Wolfie Creations"
  },
  { value: "442956ea-b293-4446-b3c0-526f160e1c15", label: "Rainbowbeatz" },
  { value: "9e1de776-d869-46ce-9bda-fccc58061ae5", label: "Ranshiin" },
  { value: "e65dc55b-3b47-4f61-a593-5aa83c272aa4", label: "Rastafarian Lion" },
  {
    value: "41af86ca-beec-4ca7-ad11-909375844298",
    label: "Ratty Mischief Creations"
  },
  { value: "be608a58-3a9e-40cd-b7e5-39f737bba76e", label: "Ravell" },
  { value: "f14d2ae1-7ff8-4c45-92b3-c007e38258c0", label: "Razzy Lee" },
  { value: "2bd5245f-cd7e-406f-b9a8-89090791ae0a", label: "Reason for Pawz" },
  {
    value: "531393cc-11d9-4235-88a2-a136c03fef51",
    label: "Red Diamond Creations"
  },
  { value: "5da1f03f-a395-4d6a-89ed-1f8aff25b0a6", label: "Red Hyena" },
  { value: "055e9c41-2071-44e1-abb3-16eb450db8fd", label: "Redstorm Fursuits" },
  {
    value: "6cec239d-b839-4b53-9057-df7811c48e2d",
    label: "Regal Wolf Studios"
  },
  {
    value: "96911080-c77e-4b6b-b12f-36763aa4ff00",
    label: "Resurrecting Creatures"
  },
  {
    value: "1db62055-7059-47e5-b235-95aabd370488",
    label: "Reveille D'Giovanetti"
  },
  { value: "d923cb74-672c-439f-8b48-b3328d59d6bc", label: "Rex" },
  { value: "065ccfd0-e377-4aec-9410-1da91d055bac", label: "Rhee" },
  { value: "4e15358a-aeb4-4680-bb60-0696415759c4", label: "Rhys Ookami" },
  { value: "232a01a8-7ec2-411b-9511-79c4c0827369", label: "Ritz Costumes" },
  { value: "4aec86aa-2b9e-402a-bb18-50148440d724", label: "Roofur" },
  { value: "cf7277b0-2b45-4001-892b-451b6037d42b", label: "RooSuits" },
  { value: "389dfaf0-24a2-4c06-b186-0f8b112f9add", label: "Rosequoll" },
  {
    value: "0a90f36e-0ed9-4b02-9a4c-cd194f6ccea7",
    label: "Rossykitti Kreations"
  },
  { value: "445a2eef-b1d8-4231-84bf-2d366eaca2b2", label: "Rowdy Monster" },
  {
    value: "1b130d59-6bc0-42b0-8fff-6bca8f70be0a",
    label: "Ruff Stuff Costumes"
  },
  { value: "5b15e782-daf6-4feb-a576-e997827b295e", label: "Ruffled Designs" },
  { value: "800fd8dd-7150-41a5-b609-81ea7c0c8af9", label: "Rum Wolf Studios" },
  { value: "d91d4080-e2b8-4d12-9b1b-01bd8fb14c9f", label: "Runaway Workshop" },
  {
    value: "e5b74a29-89b3-45e1-b0ec-9ef060f33f81",
    label: "Running Wolf Productions"
  },
  { value: "e506af05-8fdc-4853-a99a-352e3fd67c5e", label: "Runoratsu" },
  { value: "ffd7eba0-8039-4e66-801a-db2adc7a7fc5", label: "Rust Rat" },
  { value: "45dda91e-fc56-4624-8ed2-3004f72e9108", label: "Ryoken" },
  { value: "06fb2440-697a-48a9-98e3-ece26c10f408", label: "Sabrinageek" },
  { value: "f433e224-c020-4545-9e58-f544a4cf44ab", label: "Saigo Zangetzu" },
  { value: "990c9f80-8501-41f0-b5aa-fbc1b5482c78", label: "Salty Suits" },
  { value: "d8b69e3b-bb66-49a4-9bb5-7191373d358b", label: "Salvo Sniper" },
  {
    value: "8690e93c-4b25-4663-86d4-e7822f3fb00c",
    label: "Sammy Smiles Works"
  },
  {
    value: "cd439f79-faee-433d-983d-350ee8d1adf1",
    label: "Sammy's Fur Shoppe"
  },
  { value: "c48ad7cf-bb41-4be4-8d41-906cd4fc2a5d", label: "Sanctuary Suits" },
  { value: "f437ee7a-07af-4221-ac87-eff443474b53", label: "Sarahcat" },
  { value: "88a4f1cc-2c78-4c10-9e93-6ae315aabef0", label: "Sasa Creations" },
  { value: "da555f86-4f47-4f32-8088-e966075532fc", label: "Sashaligress" },
  {
    value: "c4d23f97-24b7-46b9-b1ac-242d54b09750",
    label: "Sassy Pup Creations"
  },
  {
    value: "52484ab8-0878-4544-9323-ca0d8d941c6c",
    label: "Savage Turtle Studios"
  },
  { value: "be5f2b64-6c14-403a-bdc3-3edc283d9c88", label: "Scardykat85" },
  {
    value: "1de30669-ba33-411a-9662-701eef2d07ab",
    label: "Schneepardi Creations"
  },
  { value: "954f29e9-5bcc-408a-ad16-3414f951d4a3", label: "Scratch Kitty" },
  {
    value: "a698d5bf-4697-468d-b009-4583151b4ea9",
    label: "Scuddlebutt Creatures"
  },
  { value: "2e52cdb1-b9c5-4197-9865-c03511188b49", label: "Seadog Suits" },
  { value: "a9ec024d-ad19-46e5-88e6-91135fba6488", label: "SereStudios" },
  { value: "906134ec-af0d-436e-bffe-07cd4852608e", label: "Sewing-Critters" },
  { value: "b366a09f-706f-42c6-9e69-928321e09ea0", label: "Seylyn" },
  {
    value: "30ff6e38-dae6-4a6a-a2c5-bdedaae4ed09",
    label: "Shaggy Griffon Studios"
  },
  { value: "aa4e5f98-2df6-4723-85b0-c8e6a0cb8ee9", label: "Shagpoke Studios" },
  { value: "fd65d242-46fa-4d4a-80c5-f560b4b3dc0a", label: "Sharkteefs" },
  { value: "07325f33-e0de-4b5f-9254-e198a2905794", label: "Sharpe Costumes" },
  { value: "29a2f07e-7f7a-4d62-be91-0209a69e3008", label: "Sheevee" },
  { value: "37d33c3b-4e01-4d3e-b530-c262c40cded1", label: "Shengoh" },
  { value: "067b712b-21b0-4906-9da4-17775bea436d", label: "Shkaff" },
  {
    value: "b8a480ca-63e5-472a-bfee-590cbf4d4f8e",
    label: "Shock Collar Studios"
  },
  {
    value: "694d631d-f4a2-485a-a351-9c8acf18a7c6",
    label: "Short Stack Studios"
  },
  { value: "33570bf2-fe68-4605-99f4-eca4f202a69e", label: "Showreel Studios" },
  { value: "e106e472-039e-4d56-955c-65025953da15", label: "Shuntorizzy" },
  { value: "ee282153-9bf8-4c98-982a-016aab8ad5b9", label: "Silent Howl" },
  { value: "10d40242-ff51-4db2-a48b-714e19398610", label: "Silvena Handmade" },
  { value: "9c9b3f20-5133-4f67-a97b-f9a06cac52a7", label: "Silver Sky Studio" },
  { value: "77e47554-814d-43ea-ba20-146707aff150", label: "Silverfang" },
  {
    value: "296f1a9a-dbef-4d47-ba73-90768f853f44",
    label: "Sironafur Creations"
  },
  { value: "17fc3af9-f52c-4eb9-9f4f-9db0d3fad024", label: "Skookum" },
  { value: "b5a52f79-54c9-475c-b608-cd9b30aff32c", label: "Sky Hawk Cosplay" },
  { value: "94a70950-555d-41eb-8abf-c292a339db0b", label: "Skyehigh Studios" },
  { value: "259cbc3a-4671-4dcf-93c3-a6958fb234d2", label: "Skypro Costumes" },
  { value: "f2ca9897-3527-4431-a948-6b4f28ded441", label: "Slap Happy Bunny" },
  { value: "380d3dc5-5092-4341-a5eb-797c7d876486", label: "SmolShepSuits" },
  { value: "9401a558-6ef8-43e1-9a25-c0b83297afed", label: "Snow Covered Yote" },
  {
    value: "3ee91422-2d2f-4efe-945b-80b1f7e6da2f",
    label: "Snow Gryphon Suits"
  },
  {
    value: "04ea79a5-2877-414c-ad40-9093828820b3",
    label: "Snow Leopard Creations"
  },
  { value: "4b738975-9044-4b27-8bc6-adba7e623bb5", label: "Soapdish" },
  { value: "fb0c605b-2a94-48da-b741-bb608e280052", label: "Solemn Vulpine" },
  { value: "df281d45-133c-464b-bec3-a96b46bba114", label: "Sonartoo" },
  {
    value: "9f03c89c-0c86-4dd7-8911-b3e28ec9a8e7",
    label: "Soul Bound Fursuits"
  },
  { value: "e9b514c4-95b8-41ea-9ee2-759a28c6bd9e", label: "Soul Creations" },
  {
    value: "2f8da8cc-6c90-464a-8552-c69a0bb21244",
    label: "Space Cat Creations"
  },
  { value: "35aa5d60-b9ce-4fb8-a6b1-13bddef6d86d", label: "SPark Costuming" },
  { value: "bb1fabc9-1770-4ef2-bf47-cedde7554881", label: "Spark Studios" },
  { value: "26de236a-9757-45bc-8dfe-51899bfadca9", label: "Sparkle Kreations" },
  {
    value: "9fbba7aa-27c3-4d0d-9270-f1a8f7606107",
    label: "Sparklepup Studios"
  },
  { value: "aca4c23c-1814-42ee-bc44-12ed96f1c94f", label: "SparkyCanDo" },
  { value: "e79d3ece-7d42-4895-b033-c7bbda645ae1", label: "Sparkyena" },
  {
    value: "884cef43-d060-433b-9123-bc4ea2840413",
    label: "Speckled Blue Nose"
  },
  { value: "f4d13c7a-6621-45c2-8be9-50ea09dceb39", label: "Speckled Studios" },
  { value: "4d4aede2-029e-4b4f-9b79-351951ffaad8", label: "Spinfox" },
  {
    value: "49cad941-0636-45cb-b791-8a7d260b18ff",
    label: "SpiritPanda Creature Cosplay and Costumes"
  },
  {
    value: "0daa581d-8920-4947-9ebd-f29d217f8a64",
    label: "Spit and Ink Studios"
  },
  {
    value: "9b77c174-4b32-499e-b84d-8f73b78708d7",
    label: "Splinter Fox Productions"
  },
  { value: "22844fb9-ae82-4654-8124-a600ab0027a0", label: "SplootSuits" },
  {
    value: "def11c7d-163e-4019-ba67-817953d148b7",
    label: "Spotty Productions"
  },
  { value: "0c85ef8b-ef6d-46c1-a652-7fae834b1344", label: "Spud Studios" },
  { value: "3d8a65ef-f195-45a1-9718-c1e93fa33855", label: "Squeaky Chewtoy" },
  {
    value: "e38d0fab-5615-4ceb-a6cd-c2658f72d5ed",
    label: "Star Candy Creations"
  },
  { value: "5fb27073-779a-4da6-bf4f-02c62eb4a35d", label: "Star Fursuits" },
  { value: "de3466a0-8c6e-4c49-95bf-03ad2a672dd2", label: "Starparty" },
  { value: "3b2ce84b-f156-43ea-ba1d-02aa574e9d6a", label: "Starry Kitsune" },
  { value: "638e88b7-b61c-4fa8-8510-f1f908b67fc8", label: "Starslikeroses" },
  { value: "76e0f2ee-9337-4a46-b7f0-1f3ae853418a", label: "Steel the Wolf" },
  { value: "227f4df3-fc9b-41d7-9a45-c7ee83aec743", label: "Stickypawz Studio" },
  { value: "c868d8b7-3c86-4b83-b6c1-9f9b77fb47b6", label: "Stitchit Studios" },
  {
    value: "1b6c41a3-cbc7-42fb-b4c7-b70b176d2e97",
    label: "Stitch Star Fursuits"
  },
  { value: "f916559c-5f09-43e8-8de2-938f7090707d", label: "Stone Studios" },
  {
    value: "3274ac46-8a9a-44ca-9ef8-20a9e1684430",
    label: "Storm Wolf Creations"
  },
  {
    value: "a377d7a0-36db-4c90-80a0-18e193c2c780",
    label: "Stormy Fluff Creations"
  },
  {
    value: "2726ef33-13b8-4520-bf46-b3543ac82d57",
    label: "Streifenschnauzer Fursuits"
  },
  { value: "1d7fb807-c8b3-462b-8086-e35c828fd337", label: "Studio Delights" },
  { value: "ec9f22fc-22ad-4720-963c-d732bb0f950d", label: "Studio Neko" },
  { value: "69829a48-319c-4ca4-8a56-2f16ae34c200", label: "Studio Pinali" },
  {
    value: "ecace7ca-8306-4da6-808c-c1ef7319d782",
    label: "Stuffed Panda Studios"
  },
  { value: "ff6ac607-62f3-472c-b5f7-b75592a5b047", label: "SueCreations" },
  {
    value: "23510af5-b354-4ca4-ac04-e22c3eef9d67",
    label: "Sugar Critter Studios"
  },
  {
    value: "084b8aa3-f34f-4637-9ca4-c45a57e2ec3e",
    label: "SugarNSpiceCostumes"
  },
  {
    value: "8ca421f8-de6e-4158-bf95-3f7c9979f026",
    label: "Sugarrush Creations"
  },
  { value: "8248e209-5d07-4527-b6a1-b9699bad56dc", label: "Suit-a-dile" },
  { value: "e9494bc9-4f07-40ad-884d-daf53a72d903", label: "Suits by Shark" },
  {
    value: "6ca90266-c6c8-4c87-a4ad-6e27e38cb18c",
    label: "Sun & Moon Creations"
  },
  {
    value: "3c94afbc-8eeb-47a8-9984-89606ac7bd98",
    label: "Sunny Valley Creations"
  },
  { value: "370e8d14-e506-4ed3-b6e4-5d1bf7918baf", label: "Surf Cat Costumes" },
  { value: "5f6842db-1b94-46d2-b918-b90dc05b50db", label: "Sushi Suits" },
  { value: "5cb0aedc-b2b4-45ee-ae97-853dfcb848b1", label: "Sushimon Suits" },
  { value: "6d0c230e-d0e3-48da-969c-bf6c00a1fb40", label: "Sushinom Suits" },
  {
    value: "6bcedfc7-6760-415d-b730-93579bf30930",
    label: "Suzamuri Creations"
  },
  {
    value: "b390d79d-7873-48f7-8101-d71ebd38ea47",
    label: "Sweentastic Productions"
  },
  {
    value: "7c1e6ab2-824d-4cc5-b856-c12c2590c27d",
    label: "Sweet and Salty Suits"
  },
  { value: "aa7dfeff-9fc6-4a37-bc04-13470bb370f4", label: "SweetSushi" },
  { value: "3b74d8ee-fb5f-4a2f-930f-43747da8b3a6", label: "Sylfur" },
  { value: "9b447152-bac3-4fa9-90fb-43206b4e00b7", label: "Synthwolf" },
  { value: "a092b349-15ef-409a-99d8-a75a1aa23f47", label: "Tabulambestias" },
  { value: "48c2a5be-0b28-4900-834b-fd6177826e9c", label: "Taffka" },
  { value: "98e1a663-a4c8-4da3-b955-96abf377ef6e", label: "Tailin" },
  { value: "27923150-90ec-4be8-a7f8-46ac0c14de21", label: "Tails Time" },
  { value: "33dc6b42-ee59-43c1-b816-8bd148cd7837", label: "Takumori" },
  { value: "617b29f7-9057-40a2-83a0-b7410b401432", label: "Talarus" },
  { value: "4132ad50-33d5-4392-8b6a-f5b6b0b236a5", label: "Tanidareal" },
  { value: "54e6742e-d282-4c2b-948b-472c2cc8a941", label: "Tapapat Creations" },
  { value: "7cfdfa42-6cf3-4285-aac3-a026c93fff37", label: "Taybee Fursuits" },
  {
    value: "917884e0-f641-4fa1-847d-7a40a6543ec3",
    label: "Technicolour Costumes"
  },
  { value: "f2bcbdd8-5002-4e65-a920-8cae5d452e50", label: "Templa Creations" },
  { value: "15032424-a33d-4f4c-b3df-e24648f60291", label: "Tesyra Creations" },
  { value: "23a59d13-d195-41fb-97c4-086b3ab4cada", label: "That's Furred Up" },
  {
    value: "46df7b6a-93a3-47ee-a20a-a80b26633a84",
    label: "The Corrupted Furries"
  },
  {
    value: "8aaf2519-0c84-4ee3-89a9-e6e640731f4a",
    label: "The Critter Factory"
  },
  { value: "7e023589-9f33-4b3e-ac85-5f43703fe96b", label: "The Curry Mouse" },
  {
    value: "196aa9ba-0010-48ba-b858-4d333192c0e9",
    label: "The Frozen Phoenix"
  },
  {
    value: "d5813279-16bb-444b-bbf5-30e9cf31d446",
    label: "The Fur Collective"
  },
  { value: "788f36de-edd1-4592-9417-0d467b6b69d7", label: "The Fuzz Factory" },
  {
    value: "7cfe9d3a-11fb-48ae-9051-7e8adebccb3c",
    label: "The Grotto Creations"
  },
  {
    value: "87adc8f6-8120-433d-a7fd-876e41cec657",
    label: "The Karelia Fursuits"
  },
  {
    value: "d5d830ac-d2b8-4806-904a-748db9bd7cbf",
    label: "The Menagerie Costumes"
  },
  {
    value: "a75a2a2b-3bdf-460f-8462-cbd1b0b35c74",
    label: "The Other Side of Us"
  },
  { value: "42e613bc-8bc8-419a-9fa3-7158f3e61fbb", label: "The Phoenix Nest" },
  { value: "e27c8921-d632-486a-a0ad-107856b38868", label: "The Sable Kitty" },
  {
    value: "10b74c26-7393-47fa-b8bd-8cfad3fe5b30",
    label: "The Woodland Tailor"
  },
  { value: "a1ae9753-6111-461f-91e6-dc1075a09f18", label: "Thirteen Diamonds" },
  { value: "b7f9918b-4b15-4d8c-9224-0d79f5b8b20a", label: "Thrash" },
  {
    value: "c748d79d-d60b-485c-ae26-94c5f49df461",
    label: "Thunderhowl Studios"
  },
  { value: "3b5c9bda-0bcc-4a19-9a02-150a06d19547", label: "Thursday2U" },
  {
    value: "a1e494cb-0886-41b6-ac74-28047faafc94",
    label: "Ticklish Tentacle Studio"
  },
  { value: "1c150792-04f4-45e7-a437-6cb05afe5300", label: "Tiggcreations" },
  { value: "d529a2f4-f496-432e-a36d-7f768000e241", label: "Tiggy Workz" },
  { value: "fb6d3171-b3a6-499e-90c5-7a2c755cf6fa", label: "Tiny1Badger" },
  { value: "896d219f-cba7-473b-8f48-452f73eacce8", label: "Tioh" },
  { value: "90e2f5af-a6e8-4441-8db1-9ca7fe092c2c", label: "Tokai Suiting" },
  {
    value: "2807f02d-1bb1-405f-98fe-03867a3658c4",
    label: "Tokyo Rampage Suits"
  },
  { value: "ee982a14-320a-490c-abe8-14ad4b113208", label: "Toxic Fursuits" },
  { value: "3e59a730-a599-444a-b5ac-9672c6c41f62", label: "Tribal Works" },
  { value: "3307b427-0aa1-4f8d-a36c-8c52090b505e", label: "Tsebresos" },
  { value: "33280c88-c7b2-4f91-9180-1fd1037015d2", label: "TunnySaysIDK" },
  { value: "ee4b5713-3d6c-4dc7-8f7f-77bf54d7e376", label: "TV_Thari" },
  { value: "9565a564-e6af-4400-aae4-b7782220f4dc", label: "Twinky Arts" },
  {
    value: "c01a41c6-f20d-425f-80ae-d3a818eaa82f",
    label: "Two Faced Creations"
  },
  {
    value: "7f3a881d-e424-4502-ae3e-6790bbb29307",
    label: "Two Tails Enterprises"
  },
  { value: "7854f4ff-6850-4a5c-9b5d-754eeeec7095", label: "Two Wet Noses" },
  { value: "80d2f811-2716-4808-bb70-55684e13606f", label: "Uchihafox" },
  { value: "0e7bffab-ea63-44d9-896a-039b8c401939", label: "Ugly Puppy" },
  {
    value: "716366ae-db77-4645-aeca-cf37521df96a",
    label: "Ugolek Fursuit Studio"
  },
  { value: "4ddc8128-f643-4cd1-adc4-ebef8835b1b1", label: "Untamed Fur" },
  { value: "22876086-adb0-4e73-a368-bb29e62c85ec", label: "Uren Husky" },
  { value: "8038e9b0-d59e-4bf9-94bc-13da00df805d", label: "Valdyr" },
  { value: "c6eddfc2-4edc-4a3e-86c4-9fb693ca4fc0", label: "Vegasyote" },
  { value: "e27352f5-7378-49a7-a5a7-55bc3e61bf50", label: "Velkss" },
  { value: "ca8811b2-4bf1-4a49-881e-b829bb0135bc", label: "Velveteen Soldier" },
  { value: "cb172cbb-8b3a-419a-8bee-3ae7d26b066f", label: "Vixens Creations" },
  {
    value: "faa67b58-a629-40bf-92ec-112f718a81df",
    label: "Voxal Visions Fursuits"
  },
  { value: "327473d2-95fe-4ea5-8eb2-c69cea103da8", label: "Wanderlust Suits" },
  { value: "3ad436bd-84f8-4cc8-99ee-6766edc819ca", label: "Water Dog Wharf" },
  { value: "3b00e920-3cb6-4270-93e5-cb22a8102c06", label: "We Might Bite" },
  { value: "a2f190a0-bfe7-4f77-9c4c-86765390e263", label: "Weasel Crafts" },
  { value: "9e1079aa-243c-431a-b6b0-f83872bc82a8", label: "Weasels on Easels" },
  { value: "630c0705-e6b4-4341-b04f-8e2141c69ce4", label: "West Wind Howling" },
  { value: "622644d3-1648-4d9c-82b4-d29d1607407f", label: "Whaleosaur Suits" },
  { value: "4b0f4c71-4278-4d92-9860-11d69d77511c", label: "What The Fluff" },
  { value: "9c120ed8-4dcb-4052-9d4f-a2ff1c2c89b6", label: "What's Up Hot Dog" },
  {
    value: "75d76d1d-53ef-46ab-8ec9-c9a7e644426c",
    label: "White Wolf Creations"
  },
  { value: "ddbd19a1-9bc0-4ab4-b74c-4ea3b55eb40a", label: "Why I Otter" },
  { value: "381a215a-0146-4c22-8b6b-775fbc075db5", label: "Wild Fuzz Studios" },
  { value: "172412a5-eaf1-408a-897c-ef1eded6a14d", label: "Wildlife" },
  { value: "bc91a288-5ec7-44af-bedc-31fd65785473", label: "Wildspotworks" },
  { value: "3e2cfdee-6382-4cc1-9375-58c16570af09", label: "Wildvskings" },
  { value: "0e8e5148-543c-4224-9106-3f92c67785a0", label: "Wildwolf" },
  { value: "49cb2f89-7a9b-4696-b09f-d96816a2f8a2", label: "Willow Creative" },
  { value: "70b96b59-64f3-4208-980f-7837f5e96a3b", label: "Windy Fursuits" },
  { value: "f735f54c-b3d8-48b2-87f4-d1e4cbe59251", label: "Winfox" },
  {
    value: "1ca351c0-f3f3-45a7-a684-169fe1a3f3f5",
    label: "Wingwolf Creations"
  },
  { value: "a4b26dbd-7e28-47d9-968f-0bf33a3456f8", label: "WMW66 Costumes" },
  { value: "8fe702f9-3110-45ae-bb4b-c2f1dacb16b1", label: "Wolfskin Suiting" },
  { value: "d76ae3d6-8b4c-4966-b025-cc71574926de", label: "Wolfwood72" },
  { value: "c6bb20f5-b5fb-4192-90f3-f3639b1539fd", label: "Woltirr" },
  { value: "c887aae0-e6b2-4980-af7a-a72a8fbd0085", label: "Woozles-Wonders" },
  { value: "19bc183c-ce92-4144-873a-75874c6ebbb7", label: "WorldConColor" },
  { value: "2f622f10-d182-4294-90b4-956509bcaed5", label: "Xaria Wolf" },
  { value: "b13f2336-319d-4f21-b9d7-c96f98c366a8", label: "Xianniecho" },
  {
    value: "d4e427ac-a3e4-4822-80e1-7c28f369004b",
    label: "Ya Boy Luke Fursuits"
  },
  {
    value: "7c07ffbb-3930-463d-ab8f-08fbc078bbe5",
    label: "Yette Helin Studio"
  },
  { value: "c4dfefb8-feb5-4852-95be-a7e60c97defc", label: "Yoshinomi" },
  { value: "682619a1-fc10-45e3-9f79-abc558086f13", label: "Yu Puffin" },
  {
    value: "f0741e10-3ec0-4dbf-8171-948c5143d7ce",
    label: "Z Cube Fursuit Studio"
  },
  { value: "dd6bb7ab-80f3-4ef3-8abb-00ff593ebe1f", label: "Zagone Studios" },
  { value: "a5535366-6aa2-454d-b896-f21c6b0f04a4", label: "Zarathus" },
  { value: "e8c80d5a-a1b0-4ab8-bf7c-83340770846e", label: "Zee-The-Dingo" },
  { value: "ad08f572-564c-4543-983b-b6e1c8e74b29", label: "ZombieHorse" },
  { value: "29d6a081-434b-4250-a578-4ee802cc60f3", label: "ZooAbsurd" },
  { value: "dbae4082-0295-4593-bbc0-027d99a6b2a1", label: "Zuri Studios" },
  { value: "c3ae7d0b-c0b9-4d33-bb8d-88a0352eff87", label: "Zurya Creations" },
  { value: "037cc1db-f55a-4d17-852f-fc68a6ebb289", label: "Zuzufur" },
  { value: "577292ea-0592-4136-8248-cddacb0faf14", label: "1Pup Suits" }
];

export { makersList };
