import { useState } from 'react';
import { 
  addProject, addProduct, addCertification, setAdminCredentials, 
  getProjects, updateProject, deleteProject, type Project,
  getProducts, updateProduct, deleteProduct, type Product,
  getCertifications, updateCertification, deleteCertification, type Certification
} from '../utils/dataStore';
import { ArrowLeft, CheckCircle2, ShieldCheck, FolderPlus, PackagePlus, Settings, LogOut, AlertCircle } from 'lucide-react';
import FadeIn from '../components/FadeIn';

interface AdminPageProps {
  onLogout: () => void;
}

const AdminPage = ({ onLogout }: AdminPageProps) => {
  const [activeTab, setActiveTab] = useState<'achievements' | 'projects' | 'products' | 'settings'>('achievements');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  // Projects state
  const [projectMode, setProjectMode] = useState<'list' | 'create' | 'edit'>('list');
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [projectsList, setProjectsList] = useState<Project[]>(() => getProjects());

  // Products state
  const [productMode, setProductMode] = useState<'list' | 'create' | 'edit'>('list');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [productsList, setProductsList] = useState<Product[]>(() => getProducts());

  // Certs state
  const [certMode, setCertMode] = useState<'list' | 'create' | 'edit'>('list');
  const [editingCert, setEditingCert] = useState<Certification | null>(null);
  const [certsList, setCertsList] = useState<Certification[]>(() => getCertifications());

  const refreshProjects = () => setProjectsList(getProjects());
  const refreshProducts = () => setProductsList(getProducts());
  const refreshCerts = () => setCertsList(getCertifications());
  
  const showSuccess = (msg: string) => { setSuccess(msg); setError(''); setTimeout(() => setSuccess(''), 3000); };
  const showError = (msg: string) => { setError(msg); setSuccess(''); setTimeout(() => setError(''), 4000); };

  const handleBack = (e: React.MouseEvent) => {
    e.preventDefault();
    window.location.hash = '#home';
  };

  const handleProjectSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newProject = {
      number: formData.get('number') as string,
      name: formData.get('name') as string,
      category: formData.get('category') as string,
      description: formData.get('description') as string,
      url: (formData.get('url') as string) || undefined,
      image: formData.get('image') as string,
    };

    try {
      if (projectMode === 'edit' && editingProject) {
        updateProject(editingProject.number, newProject);
        showSuccess('Project updated successfully!');
      } else {
        addProject(newProject);
        showSuccess('Project added successfully!');
      }
      refreshProjects();
      setProjectMode('list');
      setEditingProject(null);
    } catch (err: any) {
      showError(err.message || 'An error occurred');
    }
  };

  const handleDeleteProject = (number: string) => {
    if (confirm('Are you sure you want to delete this project?')) {
      deleteProject(number);
      refreshProjects();
      showSuccess('Project deleted successfully!');
    }
  };

  const handleEditProject = (project: Project) => {
    setEditingProject(project);
    setProjectMode('edit');
  };

  const handleProductSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newProduct = {
      id: formData.get('id') as string,
      title: formData.get('title') as string,
      category: formData.get('category') as string,
      description: formData.get('description') as string,
      image: formData.get('image') as string,
      buyUrl: (formData.get('buyUrl') as string) || undefined,
      viewUrl: (formData.get('viewUrl') as string) || undefined,
    };

    try {
      if (productMode === 'edit' && editingProduct) {
        updateProduct(editingProduct.id, newProduct);
        showSuccess('Product updated successfully!');
      } else {
        addProduct(newProduct);
        showSuccess('Product added successfully!');
      }
      refreshProducts();
      setProductMode('list');
      setEditingProduct(null);
    } catch (err: any) {
      showError(err.message || 'An error occurred');
    }
  };

  const handleDeleteProduct = (id: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      deleteProduct(id);
      refreshProducts();
      showSuccess('Product deleted successfully!');
    }
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setProductMode('edit');
  };

  const handleCertSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newCert = {
      id: formData.get('id') as string,
      title: formData.get('title') as string,
      issuer: formData.get('issuer') as string,
      date: formData.get('date') as string,
      description: formData.get('description') as string,
      image: formData.get('image') as string,
    };

    try {
      if (certMode === 'edit' && editingCert) {
        updateCertification(editingCert.id, newCert);
        showSuccess('Achievement updated successfully!');
      } else {
        addCertification(newCert);
        showSuccess('Achievement added successfully!');
      }
      refreshCerts();
      setCertMode('list');
      setEditingCert(null);
    } catch (err: any) {
      showError(err.message || 'An error occurred');
    }
  };

  const handleDeleteCert = (id: string) => {
    if (confirm('Are you sure you want to delete this achievement?')) {
      deleteCertification(id);
      refreshCerts();
      showSuccess('Achievement deleted successfully!');
    }
  };

  const handleEditCert = (cert: Certification) => {
    setEditingCert(cert);
    setCertMode('edit');
  };

  const handleCredentialsSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newId = formData.get('newId') as string;
    const newPassword = formData.get('newPassword') as string;
    
    setAdminCredentials(newId, newPassword);
    showSuccess('Credentials updated successfully!');
    e.currentTarget.reset();
  };

  const inputClass = "w-full bg-[#1A1A1A] border border-[#D7E2EA]/10 rounded-xl px-4 py-3 text-[#D7E2EA] placeholder-[#D7E2EA]/30 focus:outline-none focus:border-[#D7E2EA]/50 transition-colors";
  const labelClass = "block text-[#D7E2EA]/70 text-sm font-medium mb-2 uppercase tracking-wider";

  return (
    <div className="min-h-screen bg-[#0C0C0C] text-[#D7E2EA] pt-24 pb-20 px-6 sm:px-12 relative z-50">
      <div className="max-w-4xl mx-auto">
        <button 
          onClick={handleBack}
          className="flex items-center gap-2 text-[#D7E2EA]/60 hover:text-[#D7E2EA] transition-colors mb-8 group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium uppercase tracking-widest text-sm">Return Home</span>
        </button>

        <FadeIn delay={0.1}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10 border-b border-[#D7E2EA]/10 pb-6">
            <div className="flex items-center gap-4">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">
                Admin Dashboard
              </h1>
              <span className="hidden sm:inline-block bg-[#D7E2EA]/10 text-[#D7E2EA] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
                Local Storage
              </span>
            </div>
            
            <button 
              onClick={onLogout}
              className="flex items-center gap-2 text-red-400 hover:text-red-300 hover:bg-red-400/10 px-4 py-2 rounded-xl transition-colors font-bold uppercase tracking-widest text-xs"
            >
              <LogOut size={16} />
              Sign Out
            </button>
          </div>
        </FadeIn>

        {success && (
          <FadeIn delay={0}>
            <div className="mb-8 p-4 bg-green-500/10 border border-green-500/20 rounded-2xl flex items-center gap-3 text-green-400">
              <CheckCircle2 size={20} />
              <span className="font-medium">{success}</span>
            </div>
          </FadeIn>
        )}

        {error && (
          <FadeIn delay={0}>
            <div className="mb-8 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center gap-3 text-red-400">
              <AlertCircle size={20} />
              <span className="font-medium">{error}</span>
            </div>
          </FadeIn>
        )}

        <div className="flex flex-wrap gap-4 mb-10">
          <button 
            onClick={() => setActiveTab('achievements')}
            className={`flex items-center gap-2 px-5 py-3 rounded-xl font-bold uppercase tracking-wider text-sm transition-all ${activeTab === 'achievements' ? 'bg-[#D7E2EA] text-[#0C0C0C]' : 'bg-[#1A1A1A] text-[#D7E2EA]/60 hover:bg-[#D7E2EA]/10 hover:text-[#D7E2EA]'}`}
          >
            <ShieldCheck size={18} />
            Achievements
          </button>
          <button 
            onClick={() => setActiveTab('projects')}
            className={`flex items-center gap-2 px-5 py-3 rounded-xl font-bold uppercase tracking-wider text-sm transition-all ${activeTab === 'projects' ? 'bg-[#D7E2EA] text-[#0C0C0C]' : 'bg-[#1A1A1A] text-[#D7E2EA]/60 hover:bg-[#D7E2EA]/10 hover:text-[#D7E2EA]'}`}
          >
            <FolderPlus size={18} />
            Projects
          </button>
          <button 
            onClick={() => setActiveTab('products')}
            className={`flex items-center gap-2 px-5 py-3 rounded-xl font-bold uppercase tracking-wider text-sm transition-all ${activeTab === 'products' ? 'bg-[#D7E2EA] text-[#0C0C0C]' : 'bg-[#1A1A1A] text-[#D7E2EA]/60 hover:bg-[#D7E2EA]/10 hover:text-[#D7E2EA]'}`}
          >
            <PackagePlus size={18} />
            Products
          </button>
          <button 
            onClick={() => setActiveTab('settings')}
            className={`flex items-center gap-2 px-5 py-3 rounded-xl font-bold uppercase tracking-wider text-sm transition-all ${activeTab === 'settings' ? 'bg-[#D7E2EA] text-[#0C0C0C]' : 'bg-[#1A1A1A] text-[#D7E2EA]/60 hover:bg-[#D7E2EA]/10 hover:text-[#D7E2EA]'}`}
          >
            <Settings size={18} />
            Settings
          </button>
        </div>

        <FadeIn delay={0.2}>
          <div className="bg-[#111111] border border-[#D7E2EA]/5 rounded-3xl p-6 sm:p-10 shadow-2xl">
            
            {/* ACHIEVEMENTS TAB */}
            {activeTab === 'achievements' && (
              <div className="flex flex-col gap-6">
                {certMode === 'list' && (
                  <>
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-xl font-bold uppercase tracking-wider">All Achievements</h2>
                      <button 
                        onClick={() => { setCertMode('create'); setEditingCert(null); }}
                        className="bg-[#D7E2EA] text-[#0C0C0C] px-4 py-2 rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-white transition-colors"
                      >
                        + Add New Achievement
                      </button>
                    </div>
                    
                    {certsList.length === 0 ? (
                      <div className="text-center py-10 text-[#D7E2EA]/40 italic">
                        No achievements found. Add your first one!
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 gap-4">
                        {certsList.map((cert) => (
                          <div key={cert.id} className="bg-[#1A1A1A] border border-[#D7E2EA]/10 p-4 rounded-xl flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <div className="w-12 h-12 rounded-lg bg-[#222] overflow-hidden flex-shrink-0">
                                {cert.image && <img src={cert.image} alt={cert.title} className="w-full h-full object-cover" />}
                              </div>
                              <div>
                                <h3 className="font-bold text-[#D7E2EA]">{cert.title}</h3>
                                <p className="text-sm text-[#D7E2EA]/50 uppercase tracking-wider">{cert.issuer} • ID: {cert.id}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <button 
                                onClick={() => handleEditCert(cert)}
                                className="px-3 py-1.5 bg-blue-500/10 text-blue-400 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-blue-500/20 transition-colors"
                              >
                                Edit
                              </button>
                              <button 
                                onClick={() => handleDeleteCert(cert.id)}
                                className="px-3 py-1.5 bg-red-500/10 text-red-400 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-red-500/20 transition-colors"
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                )}

                {(certMode === 'create' || certMode === 'edit') && (
                  <form onSubmit={handleCertSubmit} className="flex flex-col gap-6">
                    <div className="flex justify-between items-center mb-2">
                      <h2 className="text-xl font-bold uppercase tracking-wider">
                        {certMode === 'edit' ? 'Edit Achievement' : 'Add New Achievement'}
                      </h2>
                      <button 
                        type="button"
                        onClick={() => { setCertMode('list'); setEditingCert(null); }}
                        className="text-[#D7E2EA]/60 hover:text-[#D7E2EA] text-sm uppercase font-bold tracking-widest"
                      >
                        Cancel
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className={labelClass}>ID (Unique)</label>
                        <input name="id" required type="text" defaultValue={editingCert?.id} placeholder="e.g. 01" className={inputClass} />
                      </div>
                      <div>
                        <label className={labelClass}>Achievement Title</label>
                        <input name="title" required type="text" defaultValue={editingCert?.title} placeholder="e.g. AWS Certified Developer" className={inputClass} />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className={labelClass}>Issuer</label>
                        <input name="issuer" required type="text" defaultValue={editingCert?.issuer} placeholder="e.g. Amazon Web Services" className={inputClass} />
                      </div>
                      <div>
                        <label className={labelClass}>Date</label>
                        <input name="date" required type="text" defaultValue={editingCert?.date} placeholder="e.g. August 2026" className={inputClass} />
                      </div>
                    </div>
                    <div>
                      <label className={labelClass}>Description</label>
                      <textarea name="description" required rows={4} defaultValue={editingCert?.description} placeholder="Brief description of the achievement..." className={inputClass}></textarea>
                    </div>
                    <div>
                      <label className={labelClass}>Image URL / Path</label>
                      <input name="image" required type="text" defaultValue={editingCert?.image} placeholder="/achievements/new-cert.webp OR https://..." className={inputClass} />
                    </div>
                    <button type="submit" className="mt-4 bg-[#D7E2EA] text-[#0C0C0C] font-bold uppercase tracking-widest py-4 rounded-xl hover:bg-white transition-colors">
                      {certMode === 'edit' ? 'Update Achievement' : 'Save Achievement'}
                    </button>
                  </form>
                )}
              </div>
            )}

            {/* PROJECTS TAB */}
            {activeTab === 'projects' && (
              <div className="flex flex-col gap-6">
                {projectMode === 'list' && (
                  <>
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-xl font-bold uppercase tracking-wider">All Projects</h2>
                      <button 
                        onClick={() => { setProjectMode('create'); setEditingProject(null); }}
                        className="bg-[#D7E2EA] text-[#0C0C0C] px-4 py-2 rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-white transition-colors"
                      >
                        + Add New Project
                      </button>
                    </div>
                    
                    {projectsList.length === 0 ? (
                      <div className="text-center py-10 text-[#D7E2EA]/40 italic">
                        No projects found. Add your first one!
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 gap-4">
                        {projectsList.map((project) => (
                          <div key={project.number} className="bg-[#1A1A1A] border border-[#D7E2EA]/10 p-4 rounded-xl flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <div className="w-12 h-12 rounded-lg bg-[#222] overflow-hidden flex-shrink-0">
                                {project.image && <img src={project.image} alt={project.name} className="w-full h-full object-cover" />}
                              </div>
                              <div>
                                <h3 className="font-bold text-[#D7E2EA]">{project.name}</h3>
                                <p className="text-sm text-[#D7E2EA]/50 uppercase tracking-wider">{project.category} • ID: {project.number}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <button 
                                onClick={() => handleEditProject(project)}
                                className="px-3 py-1.5 bg-blue-500/10 text-blue-400 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-blue-500/20 transition-colors"
                              >
                                Edit
                              </button>
                              <button 
                                onClick={() => handleDeleteProject(project.number)}
                                className="px-3 py-1.5 bg-red-500/10 text-red-400 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-red-500/20 transition-colors"
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                )}

                {(projectMode === 'create' || projectMode === 'edit') && (
                  <form onSubmit={handleProjectSubmit} className="flex flex-col gap-6">
                    <div className="flex justify-between items-center mb-2">
                      <h2 className="text-xl font-bold uppercase tracking-wider">
                        {projectMode === 'edit' ? 'Edit Project' : 'Add New Project'}
                      </h2>
                      <button 
                        type="button"
                        onClick={() => { setProjectMode('list'); setEditingProject(null); }}
                        className="text-[#D7E2EA]/60 hover:text-[#D7E2EA] text-sm uppercase font-bold tracking-widest"
                      >
                        Cancel
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <label className={labelClass}>Number ID (Unique)</label>
                        <input name="number" required type="text" defaultValue={editingProject?.number} placeholder="e.g. 01" className={inputClass} />
                      </div>
                      <div className="md:col-span-2">
                        <label className={labelClass}>Project Name</label>
                        <input name="name" required type="text" defaultValue={editingProject?.name} placeholder="e.g. Cool App" className={inputClass} />
                      </div>
                    </div>
                    <div>
                      <label className={labelClass}>Category</label>
                      <select name="category" required defaultValue={editingProject?.category || "web"} className={inputClass}>
                        <option value="web">Web Development</option>
                        <option value="app">App Development</option>
                        <option value="interior">Interior & 3D</option>
                      </select>
                    </div>
                    <div>
                      <label className={labelClass}>Description</label>
                      <textarea name="description" required rows={4} defaultValue={editingProject?.description} placeholder="What does this project do?" className={inputClass}></textarea>
                    </div>
                    <div>
                      <label className={labelClass}>Live URL (Optional)</label>
                      <input name="url" type="url" defaultValue={editingProject?.url} placeholder="https://..." className={inputClass} />
                    </div>
                    <div>
                      <label className={labelClass}>Image URL / Path</label>
                      <input name="image" required type="text" defaultValue={editingProject?.image} placeholder="https://images.unsplash.com/..." className={inputClass} />
                    </div>
                    <button type="submit" className="mt-4 bg-[#D7E2EA] text-[#0C0C0C] font-bold uppercase tracking-widest py-4 rounded-xl hover:bg-white transition-colors">
                      {projectMode === 'edit' ? 'Update Project' : 'Save Project'}
                    </button>
                  </form>
                )}
              </div>
            )}

            {/* PRODUCTS TAB */}
            {activeTab === 'products' && (
              <div className="flex flex-col gap-6">
                {productMode === 'list' && (
                  <>
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-xl font-bold uppercase tracking-wider">All Products</h2>
                      <button 
                        onClick={() => { setProductMode('create'); setEditingProduct(null); }}
                        className="bg-[#D7E2EA] text-[#0C0C0C] px-4 py-2 rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-white transition-colors"
                      >
                        + Add New Product
                      </button>
                    </div>
                    
                    {productsList.length === 0 ? (
                      <div className="text-center py-10 text-[#D7E2EA]/40 italic">
                        No products found. Add your first one!
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 gap-4">
                        {productsList.map((product) => (
                          <div key={product.id} className="bg-[#1A1A1A] border border-[#D7E2EA]/10 p-4 rounded-xl flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <div className="w-12 h-12 rounded-lg bg-[#222] overflow-hidden flex-shrink-0">
                                {product.image && <img src={product.image} alt={product.title} className="w-full h-full object-cover" />}
                              </div>
                              <div>
                                <h3 className="font-bold text-[#D7E2EA]">{product.title}</h3>
                                <p className="text-sm text-[#D7E2EA]/50 uppercase tracking-wider">{product.category} • ID: {product.id}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <button 
                                onClick={() => handleEditProduct(product)}
                                className="px-3 py-1.5 bg-blue-500/10 text-blue-400 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-blue-500/20 transition-colors"
                              >
                                Edit
                              </button>
                              <button 
                                onClick={() => handleDeleteProduct(product.id)}
                                className="px-3 py-1.5 bg-red-500/10 text-red-400 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-red-500/20 transition-colors"
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                )}

                {(productMode === 'create' || productMode === 'edit') && (
                  <form onSubmit={handleProductSubmit} className="flex flex-col gap-6">
                    <div className="flex justify-between items-center mb-2">
                      <h2 className="text-xl font-bold uppercase tracking-wider">
                        {productMode === 'edit' ? 'Edit Product' : 'Add New Product'}
                      </h2>
                      <button 
                        type="button"
                        onClick={() => { setProductMode('list'); setEditingProduct(null); }}
                        className="text-[#D7E2EA]/60 hover:text-[#D7E2EA] text-sm uppercase font-bold tracking-widest"
                      >
                        Cancel
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <label className={labelClass}>ID (Unique)</label>
                        <input name="id" required type="text" defaultValue={editingProduct?.id} placeholder="e.g. 01" className={inputClass} />
                      </div>
                      <div className="md:col-span-2">
                        <label className={labelClass}>Product Title</label>
                        <input name="title" required type="text" defaultValue={editingProduct?.title} placeholder="e.g. Dark Mode Dashboard UI Kit" className={inputClass} />
                      </div>
                    </div>
                    <div>
                      <label className={labelClass}>Category</label>
                      <select name="category" required defaultValue={editingProduct?.category || "web"} className={inputClass}>
                        <option value="web">Web Templates</option>
                        <option value="app">App Source Code</option>
                        <option value="interior">3D Models</option>
                      </select>
                    </div>
                    <div>
                      <label className={labelClass}>Description</label>
                      <textarea name="description" required rows={4} defaultValue={editingProduct?.description} placeholder="What does this product include?" className={inputClass}></textarea>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className={labelClass}>Buy URL</label>
                        <input name="buyUrl" type="url" defaultValue={editingProduct?.buyUrl} placeholder="https://gumroad.com/..." className={inputClass} />
                      </div>
                      <div>
                        <label className={labelClass}>Live Preview URL</label>
                        <input name="viewUrl" type="url" defaultValue={editingProduct?.viewUrl} placeholder="https://preview..." className={inputClass} />
                      </div>
                    </div>
                    <div>
                      <label className={labelClass}>Image URL / Path</label>
                      <input name="image" required type="text" defaultValue={editingProduct?.image} placeholder="https://images.unsplash.com/..." className={inputClass} />
                    </div>
                    <button type="submit" className="mt-4 bg-[#D7E2EA] text-[#0C0C0C] font-bold uppercase tracking-widest py-4 rounded-xl hover:bg-white transition-colors">
                      {productMode === 'edit' ? 'Update Product' : 'Save Product'}
                    </button>
                  </form>
                )}
              </div>
            )}

            {/* SETTINGS FORM */}
            {activeTab === 'settings' && (
              <form onSubmit={handleCredentialsSubmit} className="flex flex-col gap-6">
                <div>
                  <label className={labelClass}>New Admin ID</label>
                  <input name="newId" required type="text" placeholder="e.g. muna_admin" className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>New Password</label>
                  <input name="newPassword" required type="password" placeholder="Enter new password" className={inputClass} />
                </div>
                
                <div className="p-4 bg-orange-500/10 border border-orange-500/20 rounded-xl mt-2">
                  <p className="text-orange-400 text-sm font-medium">
                    Note: Changing your credentials will require you to use the new ID and password the next time you log in. Since there is no password recovery feature, please remember them carefully!
                  </p>
                </div>

                <button type="submit" className="mt-4 bg-[#D7E2EA] text-[#0C0C0C] font-bold uppercase tracking-widest py-4 rounded-xl hover:bg-white transition-colors">
                  Update Credentials
                </button>
              </form>
            )}

          </div>
        </FadeIn>
      </div>
    </div>
  );
};

export default AdminPage;
