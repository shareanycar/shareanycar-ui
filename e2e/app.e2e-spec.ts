import { ShareanycarUiPage } from './app.po';

describe('shareanycar-ui App', function() {
  let page: ShareanycarUiPage;

  beforeEach(() => {
    page = new ShareanycarUiPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
