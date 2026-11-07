import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { api, fallbackPackages, fallbackDestinations, fallbackBlogs, fallbackEnquiries } from './services/api';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { EnquiryModal } from './components/EnquiryModal';

// Public Pages
import { HomePage } from './pages/public/HomePage';
import { DestinationsPage } from './pages/public/DestinationsPage';
import { PackagesPage } from './pages/public/PackagesPage';
import { PackageDetailsPage } from './pages/public/PackageDetailsPage';
import { BlogsPage } from './pages/public/BlogsPage';
import { BlogDetailsPage } from './pages/public/BlogDetailsPage';
import { AboutUsPage } from './pages/public/AboutUsPage';
import { ContactUsPage } from './pages/public/ContactUsPage';

// Admin Pages
import { AdminLoginPage } from './pages/admin/AdminLoginPage';
import { AdminLayout } from './pages/admin/AdminLayout';
import { DashboardOverview } from './pages/admin/DashboardOverview';
import { PackageList } from './pages/admin/PackageList';
import { PackageEditorModal } from './pages/admin/PackageEditorModal';
import { PackageVersionHistoryModal } from './pages/admin/PackageVersionHistoryModal';
import { BlogList } from './pages/admin/BlogList';
import { BlogEditorModal } from './pages/admin/BlogEditorModal';
import { EnquiryInbox } from './pages/admin/EnquiryInbox';
import { AIAssistantReviewModal } from './pages/admin/AIAssistantReviewModal';
import { ManualEnquiryModal } from './pages/admin/ManualEnquiryModal';
import { QuotationStudioModal } from './pages/admin/QuotationStudioModal';
import { QuotationList } from './pages/admin/QuotationList';
import { ActivityLogsView } from './pages/admin/ActivityLogsView';

function MainApp() {
  const { isAuthenticated } = useAuth();

  // Navigation State
  const [currentPage, setCurrentPage] = useState('home'); // 'home', 'destinations', 'packages', 'package-details', 'blogs', 'blog-details', 'about', 'contact', 'admin-login', 'admin'
  const [adminTab, setAdminTab] = useState('overview'); // 'overview', 'packages', 'blogs', 'enquiries', 'quotations', 'logs'

  // Data Stores
  const [packages, setPackages] = useState(fallbackPackages);
  const [destinations, setDestinations] = useState(fallbackDestinations);
  const [blogs, setBlogs] = useState(fallbackBlogs);
  const [enquiries, setEnquiries] = useState(fallbackEnquiries);
  const [quotations, setQuotations] = useState([]);

  // Selected Entities for Details/Modals
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [selectedEnquiryForAI, setSelectedEnquiryForAI] = useState(null);
  const [selectedEnquiryForQuote, setSelectedEnquiryForQuote] = useState(null);
  const [packageForHistory, setPackageForHistory] = useState(null);
  const [packageToEdit, setPackageToEdit] = useState(null);
  const [blogToEdit, setBlogToEdit] = useState(null);

  // Modal Open States
  const [enquiryModalOpen, setEnquiryModalOpen] = useState(false);
  const [enquiryModalPackage, setEnquiryModalPackage] = useState(null);
  const [packageEditorOpen, setPackageEditorOpen] = useState(false);
  const [versionHistoryOpen, setVersionHistoryOpen] = useState(false);
  const [blogEditorOpen, setBlogEditorOpen] = useState(false);
  const [aiReviewOpen, setAiReviewOpen] = useState(false);
  const [manualEnquiryOpen, setManualEnquiryOpen] = useState(false);
  const [quotationStudioOpen, setQuotationStudioOpen] = useState(false);

  // Load Data on Mount
  useEffect(() => {
    loadAllData();
  }, []);

  const loadAllData = async () => {
    try {
      const [pkgs, dests, blgs, enqs] = await Promise.allSettled([
        api.getPackages(),
        api.getDestinations(),
        api.getBlogs(),
        api.getAdminEnquiries(),
      ]);

      if (pkgs.status === 'fulfilled' && pkgs.value?.length > 0) setPackages(pkgs.value);
      if (dests.status === 'fulfilled' && dests.value?.length > 0) setDestinations(dests.value);
      if (blgs.status === 'fulfilled' && blgs.value?.length > 0) setBlogs(blgs.value);
      if (enqs.status === 'fulfilled' && enqs.value?.length > 0) setEnquiries(enqs.value);
    } catch (e) {
      console.warn('Backend API offline or unreachable, using responsive mock store:', e);
    }
  };

  // Handlers for Navigation
  const handleNavigate = (pageId) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setCurrentPage(pageId);
  };

  const handleSelectPackage = (pkg) => {
    setSelectedPackage(pkg);
    handleNavigate('package-details');
  };

  const handleSelectBlog = (blog) => {
    setSelectedBlog(blog);
    handleNavigate('blog-details');
  };

  const handleOpenEnquiryForPackage = (pkg) => {
    setEnquiryModalPackage(pkg);
    setEnquiryModalOpen(true);
  };

  const handleOpenGeneralEnquiry = () => {
    setEnquiryModalPackage(null);
    setEnquiryModalOpen(true);
  };

  // Admin Actions: Package CMS
  const handleSavePackageSuccess = async (pkgData, id) => {
    try {
      const saved = await api.savePackage(pkgData, id);
      setPackages(prev => {
        const index = prev.findIndex(p => p.id === saved.id);
        if (index >= 0) {
          const updated = [...prev];
          updated[index] = saved;
          return updated;
        }
        return [saved, ...prev];
      });
    } catch (e) {
      // Local fallback state update
      const mockSaved = {
        id: id || Math.floor(100 + Math.random() * 900),
        ...pkgData,
        destination: destinations.find(d => d.id === pkgData.destinationId) || destinations[0],
        currentVersion: (pkgData.currentVersion || 1) + (id ? 1 : 0),
      };
      setPackages(prev => {
        const index = prev.findIndex(p => p.id === mockSaved.id);
        if (index >= 0) {
          const updated = [...prev];
          updated[index] = mockSaved;
          return updated;
        }
        return [mockSaved, ...prev];
      });
    }
  };

  const handleDuplicatePackage = async (pkg) => {
    try {
      const clone = await api.duplicatePackage(pkg.id);
      setPackages(prev => [clone, ...prev]);
    } catch (e) {
      const mockClone = {
        ...pkg,
        id: Math.floor(200 + Math.random() * 800),
        title: pkg.title + ' (Copy)',
        status: 'DRAFT',
        currentVersion: 1,
      };
      setPackages(prev => [mockClone, ...prev]);
    }
  };

  const handleDeletePackage = async (id) => {
    if (!window.confirm('Are you sure you want to delete this package?')) return;
    try {
      await api.deletePackage(id);
    } catch (e) {}
    setPackages(prev => prev.filter(p => p.id !== id));
  };

  // Admin Actions: Blog CMS
  const handleSaveBlogSuccess = async (blogData, id) => {
    try {
      const saved = await api.saveBlog(blogData, id);
      setBlogs(prev => {
        const index = prev.findIndex(b => b.id === saved.id);
        if (index >= 0) {
          const updated = [...prev];
          updated[index] = saved;
          return updated;
        }
        return [saved, ...prev];
      });
    } catch (e) {
      const mockSaved = {
        id: id || Math.floor(100 + Math.random() * 900),
        ...blogData,
      };
      setBlogs(prev => {
        const index = prev.findIndex(b => b.id === mockSaved.id);
        if (index >= 0) {
          const updated = [...prev];
          updated[index] = mockSaved;
          return updated;
        }
        return [mockSaved, ...prev];
      });
    }
  };

  const handleDeleteBlog = async (id) => {
    if (!window.confirm('Are you sure you want to delete this article?')) return;
    try {
      await api.deleteBlog(id);
    } catch (e) {}
    setBlogs(prev => prev.filter(b => b.id !== id));
  };

  // Admin Actions: Enquiry CRM & AI
  const handleStatusChange = async (enquiryId, newStatus) => {
    try {
      await api.updateEnquiryStatus(enquiryId, newStatus);
    } catch (e) {}
    setEnquiries(prev => prev.map(enq => enq.id === enquiryId ? { ...enq, status: newStatus } : enq));
  };

  const handleAddNote = async (enquiryId, noteText) => {
    try {
      await api.addEnquiryNote(enquiryId, noteText);
    } catch (e) {}
    setEnquiries(prev => prev.map(enq => {
      if (enq.id === enquiryId) {
        const notes = enq.notes || [];
        return {
          ...enq,
          notes: [{ id: Date.now(), note: noteText, authorName: 'Staff Consultant', createdAt: new Date().toISOString() }, ...notes]
        };
      }
      return enq;
    }));
  };

  const handleSaveManualEnquiry = async (data) => {
    try {
      const saved = await api.saveManualEnquiry(data);
      setEnquiries(prev => [saved, ...prev]);
    } catch (e) {
      const mock = {
        id: Math.floor(100 + Math.random() * 900),
        referenceNo: 'ENQ-2026-' + Math.floor(1000 + Math.random() * 9000),
        status: 'NEW',
        ...data,
      };
      setEnquiries(prev => [mock, ...prev]);
    }
  };

  // Render Admin View
  if (currentPage === 'admin-login') {
    return (
      <AdminLoginPage
        onLoginSuccess={() => setCurrentPage('admin')}
        onCancel={() => setCurrentPage('home')}
      />
    );
  }

  if (currentPage === 'admin') {
    return (
      <AdminLayout
        activeTab={adminTab}
        onTabChange={setAdminTab}
        onExitToSite={() => setCurrentPage('home')}
      >
        {adminTab === 'overview' && (
          <DashboardOverview
            onNavigateTab={setAdminTab}
            onReviewEnquiry={(enq) => {
              setSelectedEnquiryForAI(enq);
              setAiReviewOpen(true);
            }}
          />
        )}

        {adminTab === 'packages' && (
          <PackageList
            packages={packages}
            destinations={destinations}
            onCreate={() => {
              setPackageToEdit(null);
              setPackageEditorOpen(true);
            }}
            onEdit={(pkg) => {
              setPackageToEdit(pkg);
              setPackageEditorOpen(true);
            }}
            onDuplicate={handleDuplicatePackage}
            onDelete={handleDeletePackage}
            onOpenVersions={(pkg) => {
              setPackageForHistory(pkg);
              setVersionHistoryOpen(true);
            }}
            onPreview={(pkg) => {
              setSelectedPackage(pkg);
              setCurrentPage('package-details');
            }}
          />
        )}

        {adminTab === 'blogs' && (
          <BlogList
            blogs={blogs}
            onCreate={() => {
              setBlogToEdit(null);
              setBlogEditorOpen(true);
            }}
            onEdit={(b) => {
              setBlogToEdit(b);
              setBlogEditorOpen(true);
            }}
            onDelete={handleDeleteBlog}
            onPreview={(b) => {
              setSelectedBlog(b);
              setCurrentPage('blog-details');
            }}
          />
        )}

        {adminTab === 'enquiries' && (
          <EnquiryInbox
            enquiries={enquiries}
            onOpenManualEnquiry={() => setManualEnquiryOpen(true)}
            onReviewAI={(enq) => {
              setSelectedEnquiryForAI(enq);
              setAiReviewOpen(true);
            }}
            onOpenQuotationStudio={(enq) => {
              setSelectedEnquiryForQuote(enq);
              setQuotationStudioOpen(true);
            }}
            onStatusChange={handleStatusChange}
            onAddNote={handleAddNote}
            onAssign={() => {}}
          />
        )}

        {adminTab === 'quotations' && (
          <QuotationList quotations={quotations} />
        )}

        {adminTab === 'logs' && (
          <ActivityLogsView />
        )}

        {/* Admin Modals */}
        <PackageEditorModal
          isOpen={packageEditorOpen}
          onClose={() => setPackageEditorOpen(false)}
          packageToEdit={packageToEdit}
          destinations={destinations}
          onSaveSuccess={handleSavePackageSuccess}
        />

        <PackageVersionHistoryModal
          isOpen={versionHistoryOpen}
          onClose={() => setVersionHistoryOpen(false)}
          pkg={packageForHistory}
          onRollbackSuccess={loadAllData}
        />

        <BlogEditorModal
          isOpen={blogEditorOpen}
          onClose={() => setBlogEditorOpen(false)}
          blogToEdit={blogToEdit}
          packages={packages}
          onSaveSuccess={handleSaveBlogSuccess}
        />

        <AIAssistantReviewModal
          isOpen={aiReviewOpen}
          onClose={() => setAiReviewOpen(false)}
          enquiry={selectedEnquiryForAI}
          onReviewSuccess={loadAllData}
        />

        <ManualEnquiryModal
          isOpen={manualEnquiryOpen}
          onClose={() => setManualEnquiryOpen(false)}
          onSaveSuccess={handleSaveManualEnquiry}
        />

        <QuotationStudioModal
          isOpen={quotationStudioOpen}
          onClose={() => setQuotationStudioOpen(false)}
          enquiry={selectedEnquiryForQuote}
          packages={packages}
          onQuotationCreated={(q) => setQuotations(prev => [q, ...prev])}
        />
      </AdminLayout>
    );
  }

  // Render Public Website
  return (
    <div className="min-h-screen flex flex-col bg-ivory text-charcoal-900">
      
      <Navbar
        currentTab={currentPage}
        onNavigate={handleNavigate}
        onOpenEnquiry={handleOpenGeneralEnquiry}
      />

      <main className="flex-1">
        {currentPage === 'home' && (
          <HomePage
            destinations={destinations}
            packages={packages}
            blogs={blogs}
            onSelectPackage={handleSelectPackage}
            onSelectDestination={() => handleNavigate('packages')}
            onSelectBlog={handleSelectBlog}
            onOpenEnquiry={handleOpenGeneralEnquiry}
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === 'destinations' && (
          <DestinationsPage
            destinations={destinations}
            onSelectDestination={() => handleNavigate('packages')}
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === 'packages' && (
          <PackagesPage
            packages={packages}
            destinations={destinations}
            onSelectPackage={handleSelectPackage}
            onOpenEnquiry={handleOpenEnquiryForPackage}
          />
        )}

        {currentPage === 'package-details' && (
          <PackageDetailsPage
            pkg={selectedPackage || packages[0]}
            allPackages={packages}
            onBack={() => handleNavigate('packages')}
            onOpenEnquiry={handleOpenEnquiryForPackage}
            onSelectPackage={handleSelectPackage}
          />
        )}

        {currentPage === 'blogs' && (
          <BlogsPage
            blogs={blogs}
            onSelectBlog={handleSelectBlog}
          />
        )}

        {currentPage === 'blog-details' && (
          <BlogDetailsPage
            blog={selectedBlog || blogs[0]}
            allPackages={packages}
            onBack={() => handleNavigate('blogs')}
            onSelectPackage={handleSelectPackage}
            onOpenEnquiry={handleOpenEnquiryForPackage}
          />
        )}

        {currentPage === 'about' && (
          <AboutUsPage
            onOpenEnquiry={handleOpenGeneralEnquiry}
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === 'contact' && (
          <ContactUsPage
            onOpenEnquiry={handleOpenGeneralEnquiry}
          />
        )}
      </main>

      <Footer onNavigate={handleNavigate} />

      {/* Public Enquiry Modal */}
      <EnquiryModal
        isOpen={enquiryModalOpen}
        onClose={() => setEnquiryModalOpen(false)}
        preselectedPackage={enquiryModalPackage}
      />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}
