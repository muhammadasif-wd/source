## sidebar

``
import {document_sidebar} from "@/assets/db/sidebar";
import {NavLink} from "@/components/nav-link";
import {Icon} from "@iconify/react";
import {Button} from "@nextui-org/react";
import {AnimatePresence, motion} from "framer-motion";
import Link from "next/link";
import {useState} from "react";
import SidebarMenu from "./sidebarMenu";

const Sidebar = ({children}: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const showAnimation = {
    hidden: {
      width: 0,
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    },
    show: {
      opacity: 1,
      width: "auto",
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <motion.div
      animate={{
        width: isOpen ? "324px" : "80px",

        transition: {
          duration: 0.5,
          type: "spring",
          damping: 10,
        },
      }}
      className={`relative min-w-20`}
    >
      <motion.div
        animate={{
          width: isOpen ? "272px" : "80px",

          transition: {
            duration: 0.5,
            type: "spring",
            damping: 10,
          },
        }}
        className={`p-5 border-r h-screen absolute z-50 bg-white`}
      >
        <div className="flex items-center justify-between">
          <AnimatePresence>
            {isOpen && (
              <motion.div variants={showAnimation} initial="hidden" animate="show" exit="hidden">
                <Link
                  href={"/document-service"}
                  className="text-xl font-bold text-dark dark:text-foreground "
                >
                  DMS
                </Link>
              </motion.div>
            )}
          </AnimatePresence>

          <Button className="w-10 text-dark" variant="flat" radius="sm" isIconOnly onClick={toggle}>
            <Icon className="w-5 h-5" icon="fluent:list-bar-20-filled" />
          </Button>
        </div>
        <section className="mt-10 space-y-3">
          {document_sidebar.map((route, index) => {
            if (route.submenu) {
              return (
                <SidebarMenu
                  setIsOpen={setIsOpen}
                  route={route}
                  showAnimation={showAnimation}
                  isOpen={isOpen}
                />
              );
            }

            return (
              <NavLink
                isOpen={!isOpen}
                exact
                href={route.link}
                key={index}
                className="flex items-center justify-start text-dark dark:text-light gap-3 px-3 py-2"
              >
                <Icon className={`w-5 h-5`} icon={route.icon} />
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      variants={showAnimation}
                      initial="hidden"
                      animate="show"
                      exit="hidden"
                      className="link_text"
                    >
                      {route.name}
                    </motion.div>
                  )}
                </AnimatePresence>
              </NavLink>
            );
          })}
        </section>
      </motion.div>

      <main>{children}</main>
    </motion.div>
  );
};

export default Sidebar;
``


## sidebar menu

import {NavLink} from "@/components/nav-link";
import {Icon} from "@iconify/react";
import {Button} from "@nextui-org/react";
import {AnimatePresence, motion} from "framer-motion";
import {useEffect, useState} from "react";

const menuAnimation = {
  hidden: {
    opacity: 0,
    height: 0,
    padding: 0,
    transition: {duration: 0.3, when: "afterChildren"},
  },
  show: {
    opacity: 1,
    height: "auto",
    transition: {
      duration: 0.3,
      when: "beforeChildren",
    },
  },
};
const menuItemAnimation = {
  hidden: (i: number) => ({
    padding: 0,
    x: "-100%",
    transition: {
      duration: (i + 1) * 0.1,
    },
  }),
  show: (i: number) => ({
    x: 0,
    transition: {
      duration: (i + 1) * 0.1,
    },
  }),
};

const SidebarMenu = ({route, showAnimation, isOpen, setIsOpen}: any) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setIsOpen(true);
  };

  useEffect(() => {
    if (!isOpen) {
      setIsMenuOpen(false);
    }
  }, [isOpen]);
  return (
    <>
      <Button
        isIconOnly={!isOpen}
        variant="flat"
        radius="sm"
        className={`flex items-center ${isOpen ? "w-full justify-between" : "justify-center"}`}
        onClick={toggleMenu}
      >
        <div className="flex gap-3 items-center">
          <Icon className="w-5 h-5" icon={route.icon} />
          <AnimatePresence>
            {isOpen && (
              <motion.div variants={showAnimation} initial="hidden" animate="show" exit="hidden">
                {route.name}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        {isOpen && (
          <motion.div
            animate={
              isMenuOpen
                ? {
                    rotate: -90,
                  }
                : {rotate: 0}
            }
          >
            <Icon className="w-5 h-5" icon="mingcute:down-fill" />
          </motion.div>
        )}
      </Button>
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            variants={menuAnimation}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="space-y-1"
          >
            {route.submenu?.map((subRoute: any, i: any) => (
              <motion.div variants={menuItemAnimation} key={i} custom={i}>
                <NavLink
                  href={subRoute.link}
                  className="ml-5 flex items-center justify-start gap-3"
                >
                  <Icon className="w-5 h-5" icon={subRoute.icon} />
                  <motion.div className="">{subRoute.name}</motion.div>
                </NavLink>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SidebarMenu;



