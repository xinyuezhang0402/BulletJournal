const backgroundImages = [
  'https://user-images.githubusercontent.com/122956/86581423-f225f580-bf34-11ea-8b89-e0ff2517d8ec.jpg',
  'https://user-images.githubusercontent.com/122956/86581428-f4884f80-bf34-11ea-994b-6cf4ed024f85.jpg',
  'https://user-images.githubusercontent.com/122956/86581430-f4884f80-bf34-11ea-8a70-ed1b40269b18.jpg',
  'https://user-images.githubusercontent.com/122956/86581434-f520e600-bf34-11ea-939b-303a2a503873.jpg',
  'https://user-images.githubusercontent.com/122956/86581436-f5b97c80-bf34-11ea-80e7-f0a9f9a433d1.jpg',
  'https://user-images.githubusercontent.com/122956/86581437-f5b97c80-bf34-11ea-97d9-21dbacfa905b.jpg',
  'https://user-images.githubusercontent.com/122956/86581439-f6521300-bf34-11ea-9dae-7f68f2f6717e.jpg',
  'https://user-images.githubusercontent.com/122956/86581441-f6521300-bf34-11ea-85cc-d13cd4ebfdeb.jpg',
  'https://user-images.githubusercontent.com/122956/86581443-f6521300-bf34-11ea-9205-6364f5d7752d.jpg',
  'https://user-images.githubusercontent.com/122956/86581446-f6eaa980-bf34-11ea-967a-6988bcaf561b.jpg',
  'https://user-images.githubusercontent.com/122956/86581448-f7834000-bf34-11ea-8abb-0e6e2362fcb6.jpg',
  'https://user-images.githubusercontent.com/122956/86581449-f7834000-bf34-11ea-81f6-2cd1b483fb4c.jpg',
  'https://user-images.githubusercontent.com/122956/86581451-f7834000-bf34-11ea-8c4b-57e42888a764.jpg',
  'https://user-images.githubusercontent.com/122956/86581452-f81bd680-bf34-11ea-946b-75e0505d5bb1.jpg',
  'https://user-images.githubusercontent.com/122956/86581455-f81bd680-bf34-11ea-85b6-ace449e67470.jpg',
  'https://user-images.githubusercontent.com/122956/86581458-f8b46d00-bf34-11ea-97a7-580d16f0fb72.jpg',
  'https://user-images.githubusercontent.com/122956/86581460-f8b46d00-bf34-11ea-8399-f5e945d34fa5.jpg',
  'https://user-images.githubusercontent.com/122956/86581462-f94d0380-bf34-11ea-8784-6153155ea151.jpg',
  'https://user-images.githubusercontent.com/122956/86581463-f94d0380-bf34-11ea-8ba0-60c9d8c7f7a9.jpg',
  'https://user-images.githubusercontent.com/122956/86581464-f9e59a00-bf34-11ea-8725-686a4b269383.jpg',
  'https://user-images.githubusercontent.com/122956/86581467-fa7e3080-bf34-11ea-93b1-0f5ce489516e.jpg',
  'https://user-images.githubusercontent.com/122956/86581471-fb16c700-bf34-11ea-9e63-fb5917084a4e.jpg',
  'https://user-images.githubusercontent.com/122956/86581473-fb16c700-bf34-11ea-83b4-0afab951bd85.jpg',
  'https://user-images.githubusercontent.com/122956/86581475-fbaf5d80-bf34-11ea-97cb-67bda57e1a9d.jpg',
  'https://user-images.githubusercontent.com/122956/86581477-fbaf5d80-bf34-11ea-8381-ae69156eeaca.jpg',
  'https://user-images.githubusercontent.com/122956/86581479-fc47f400-bf34-11ea-8ddd-87d3a82c4976.jpg',
  'https://user-images.githubusercontent.com/122956/86581480-fc47f400-bf34-11ea-9643-f691c7d348e6.jpg',
  'https://user-images.githubusercontent.com/122956/86581481-fc47f400-bf34-11ea-973c-2ab87e310e82.jpg',
  'https://user-images.githubusercontent.com/122956/86581484-fce08a80-bf34-11ea-9ee5-1178d498bc22.jpg',
  'https://user-images.githubusercontent.com/122956/86581485-fd792100-bf34-11ea-8fae-fd174b5a25f3.jpg',
  'https://user-images.githubusercontent.com/122956/86585164-ea694f80-bf3a-11ea-8495-9f28bd752ad6.jpg',
  'https://user-images.githubusercontent.com/122956/86585170-ec331300-bf3a-11ea-9bc1-83222755f4f9.jpg',
  'https://user-images.githubusercontent.com/122956/86585178-eccba980-bf3a-11ea-8a11-2b8391fe619c.jpg',
  'https://user-images.githubusercontent.com/122956/86585180-ed644000-bf3a-11ea-8bd8-70e07149c2b2.jpg',
  'https://user-images.githubusercontent.com/122956/86585181-edfcd680-bf3a-11ea-9f55-d95e8a2bf37d.jpg',
  'https://user-images.githubusercontent.com/122956/86585182-ee956d00-bf3a-11ea-9989-30a416bdd067.jpg',
  'https://user-images.githubusercontent.com/122956/86585184-ee956d00-bf3a-11ea-8a65-60875c98a052.jpg',
  'https://user-images.githubusercontent.com/122956/86585185-ef2e0380-bf3a-11ea-9fd0-6f2a99f48fb9.jpg',
  'https://user-images.githubusercontent.com/122956/86585188-ef2e0380-bf3a-11ea-9d40-37ef24bca9be.jpg',
  'https://user-images.githubusercontent.com/122956/86585189-efc69a00-bf3a-11ea-92fa-4955c117e415.jpg',
  'https://user-images.githubusercontent.com/122956/86585191-efc69a00-bf3a-11ea-9f3f-ab97e15fde52.jpg',
  'https://user-images.githubusercontent.com/122956/86585193-f05f3080-bf3a-11ea-90b6-65019297a943.jpg',
  'https://user-images.githubusercontent.com/122956/86585197-f0f7c700-bf3a-11ea-8378-6225027e0746.jpg',
  'https://user-images.githubusercontent.com/122956/86585200-f0f7c700-bf3a-11ea-9151-1a4b7f67f3f5.jpg',
  'https://user-images.githubusercontent.com/122956/86585201-f1905d80-bf3a-11ea-961d-e0aaa23d478e.jpg',
  'https://user-images.githubusercontent.com/122956/86585202-f1905d80-bf3a-11ea-8bf4-8d98fa16693b.jpg',
  'https://user-images.githubusercontent.com/122956/86585203-f228f400-bf3a-11ea-8aa2-0508c157382e.jpg',
  'https://user-images.githubusercontent.com/122956/86585204-f228f400-bf3a-11ea-97f9-23c93c1e628a.jpg',
  'https://user-images.githubusercontent.com/122956/86585205-f2c18a80-bf3a-11ea-81f8-7c199607093b.jpg',
  'https://user-images.githubusercontent.com/122956/86585207-f35a2100-bf3a-11ea-94e2-17d4e2d8e817.jpg',
  'https://user-images.githubusercontent.com/122956/86585209-f35a2100-bf3a-11ea-8695-8dbe556fc175.jpg',
  'https://user-images.githubusercontent.com/122956/86585210-f3f2b780-bf3a-11ea-936d-2f0367d2e500.jpg',
  'https://user-images.githubusercontent.com/122956/86585211-f3f2b780-bf3a-11ea-95cd-c86b149fa9cb.jpg',
  'https://user-images.githubusercontent.com/122956/86585213-f48b4e00-bf3a-11ea-93a5-20a5821664cb.jpg',
  'https://user-images.githubusercontent.com/122956/86585214-f523e480-bf3a-11ea-9bcd-e1463620c538.jpg',
  'https://user-images.githubusercontent.com/122956/86585216-f523e480-bf3a-11ea-966b-407d4feffa66.jpg',
  'https://user-images.githubusercontent.com/122956/86585217-f523e480-bf3a-11ea-83a8-f2b74524a22c.jpg',
  'https://user-images.githubusercontent.com/122956/86585218-f5bc7b00-bf3a-11ea-8f74-eb6c648c6908.jpg',
  'https://user-images.githubusercontent.com/122956/86585219-f5bc7b00-bf3a-11ea-832e-33a6ea30fba4.jpg',
  'https://user-images.githubusercontent.com/122956/86585221-f6551180-bf3a-11ea-9e86-3846e58e45ec.jpg',
  'https://user-images.githubusercontent.com/122956/86585222-f6eda800-bf3a-11ea-9ead-ab7615213e9f.jpg',
  'https://user-images.githubusercontent.com/122956/86585225-f6eda800-bf3a-11ea-9929-e19aa9d966cc.jpg',
  'https://user-images.githubusercontent.com/122956/86585226-f7863e80-bf3a-11ea-92a2-9daf69ae062f.jpg',
  'https://user-images.githubusercontent.com/122956/86585227-f7863e80-bf3a-11ea-8a84-7748d208e03e.jpg',
  'https://user-images.githubusercontent.com/122956/86585229-f7863e80-bf3a-11ea-8a39-c774aa90c1ee.jpg',
  'https://user-images.githubusercontent.com/122956/86585230-f81ed500-bf3a-11ea-8e48-27e1fed55915.jpg',
  'https://user-images.githubusercontent.com/122956/86585231-f81ed500-bf3a-11ea-924f-89399210e3ac.jpg',
  'https://user-images.githubusercontent.com/122956/86585233-f8b76b80-bf3a-11ea-959a-ddac9c697290.jpg',
  'https://user-images.githubusercontent.com/122956/86585234-f9500200-bf3a-11ea-946b-3d189946c163.jpg',
  'https://user-images.githubusercontent.com/122956/86585235-f9500200-bf3a-11ea-958c-a7047eb44607.jpg',
  'https://user-images.githubusercontent.com/122956/86585238-f9e89880-bf3a-11ea-9034-abb1e8b70e94.jpg',
  'https://user-images.githubusercontent.com/122956/86585239-f9e89880-bf3a-11ea-9211-9aa75f9f50cf.jpg',
  'https://user-images.githubusercontent.com/122956/86585241-fa812f00-bf3a-11ea-8bdd-40c3d64ce5c1.jpg',
  'https://user-images.githubusercontent.com/122956/86585242-fa812f00-bf3a-11ea-8420-2d33fe16de39.jpg',
  'https://user-images.githubusercontent.com/122956/86585244-fb19c580-bf3a-11ea-97c7-62b3dd75a124.jpg',
];

export const getRandomBackgroundImage = () => {
  return backgroundImages[Math.floor(Math.random() * backgroundImages.length)];
};
