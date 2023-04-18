const app =  require( '../index');
const request =  require( 'supertest')


describe('get page', () => {
  jest.setTimeout(3000);
  test('page harus lebih dari 0', async() => {
    let res = await request(app).get('/photos?page=0&per_page=10&search=a')
    expect(res.body).toEqual({"error":"page harus lebih besar dari 0"})
  });
  test('page harus berupa angka', async() => {
    let res = await request(app).get('/photos?page=asa&per_page=10&search=a')
    expect(res.body).toEqual({"error":"page harus berupa angka lebih besar dari 0"})
  });
});

describe('get perpage', () => {
  jest.setTimeout(3000);
  test('perpage harus lebih dari 0', async() => {
    let res = await request(app).get('/photos?page=1&per_page=0&search=a')
    expect(res.body).toEqual({"error":"per_page harus lebih besar dari 0"})
  });
  test('perpage harus berupa angka', async() => {
    let res = await request(app).get('/photos?page=1&per_page=asa&search=a')
    expect(res.body).toEqual({"error":"per_page harus berupa angka lebih besar dari 0"})
  });
});

describe('get search', () => {
  jest.setTimeout(3000);
  test('get tanpa search', async() => {
    let res = await request(app).get('/photos?page=1&per_page=10')
    expect(res.body.photos.photo.length).toEqual(10)
  });
  test('get dengan search', async() => {
    let res = await request(app).get('/photos?page=1&per_page=10&search=nidzam')
    let cek = 0

    for(i=0;i<res.body.photos.photo.length;i++){
      if(res.body.photos.photo[i].title.toLowerCase().includes("nidzam")){
        cek++
      }
    }
    expect(cek>0).toBeTruthy()
  });
});


