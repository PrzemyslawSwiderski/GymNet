import { GymNetWebClientPage } from './app.po';

describe('gym-net-web-client App', function() {
  let page: GymNetWebClientPage;

  beforeEach(() => {
    page = new GymNetWebClientPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
