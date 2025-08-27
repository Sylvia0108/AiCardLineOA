// E2E test for DashboardPage
// This is a sample test file that can be run with Playwright or Cypress

describe('DashboardPage E2E Tests', () => {
  beforeEach(() => {
    // Mock LIFF login state
    cy.intercept('GET', '**/liff/init**', {
      statusCode: 200,
      body: {
        isLoggedIn: true,
        userProfile: {
          displayName: '王小明',
          pictureUrl: 'https://example.com/avatar.jpg',
          statusMessage: 'wang_little_ming'
        },
        phoneVerified: true
      }
    }).as('liffInit');
  });

  it('should display dashboard page with profile card', () => {
    cy.visit('/');
    
    // Wait for LIFF to initialize
    cy.wait('@liffInit');
    
    // Check if page title is displayed
    cy.contains('我的電子名片').should('be.visible');
    
    // Check if profile card is displayed
    cy.get('.profile-card').should('be.visible');
    
    // Check if user name is displayed
    cy.contains('王小明').should('be.visible');
    
    // Check if phone number is displayed
    cy.contains('0900000000').should('be.visible');
    
    // Check if LINE ID is displayed
    cy.contains('wang_little_ming').should('be.visible');
  });

  it('should display action buttons', () => {
    cy.visit('/');
    cy.wait('@liffInit');
    
    // Check if share button is present
    cy.get('[aria-label="Share Profile"]').should('be.visible');
    
    // Check if edit button is present
    cy.get('[aria-label="Edit Profile"]').should('be.visible');
  });

  it('should display add card button', () => {
    cy.visit('/');
    cy.wait('@liffInit');
    
    // Check if add card button is displayed
    cy.contains('新增名片').should('be.visible');
    cy.get('.add-card-button').should('be.visible');
  });

  it('should display loading state', () => {
    // Mock loading state
    cy.intercept('GET', '**/liff/init**', {
      statusCode: 200,
      body: {
        isLoggedIn: true,
        userProfile: null,
        phoneVerified: true,
        loading: true
      }
    }).as('liffLoading');
    
    cy.visit('/');
    cy.wait('@liffLoading');
    
    // Check if loading message is displayed
    cy.contains('載入中...').should('be.visible');
  });

  it('should handle back button click', () => {
    cy.visit('/');
    cy.wait('@liffInit');
    
    // Click back button
    cy.get('[aria-label="Back"]').click();
    
    // Add assertions for back button functionality
    // This would depend on the actual implementation
  });

  it('should handle settings button click', () => {
    cy.visit('/');
    cy.wait('@liffInit');
    
    // Click settings button
    cy.get('[aria-label="Settings"]').click();
    
    // Add assertions for settings button functionality
    // This would depend on the actual implementation
  });

  it('should handle add card button click', () => {
    cy.visit('/');
    cy.wait('@liffInit');
    
    // Click add card button
    cy.get('.add-card-button').click();
    
    // Add assertions for add card button functionality
    // This would depend on the actual implementation
  });
});
